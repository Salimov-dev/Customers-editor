import { createAction, createSlice } from "@reduxjs/toolkit";
import customersService from "../services/customers.service";

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    customersRequested: (state) => {
      state.isLoading = true;
    },
    customersReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    customersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    customerCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    customerUpdated: (state, action) => {
      state.entities[
        state.entities.findIndex((emp) => emp._id === action.payload._id)
      ] = action.payload;
    },
    customersRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

const customerCreateRequested = createAction(
  "customers/customerCreateRequested"
);
const customerCreateFailed = createAction("customers/customerCreateFailed");
const customersUpdateRequested = createAction(
  "customers/customersUpdateRequested"
);
const customerUpdateFailed = createAction("customers/customerUpdateFailed");
const customersRemoveRequested = createAction(
  "customers/customersRemoveRequested"
);
const customersRemoveFailed = createAction("customers/customersRemoveFailed");

const { reducer: customersReducer, actions } = customersSlice;
const {
  customersRequested,
  customersReceived,
  customersRequestFailed,
  customerCreated,
  customerUpdated,
  customersRemoved,
} = actions;

export const loadCustomersList = () => async (dispatch) => {
  dispatch(customersRequested());
  try {
    const { content } = await customersService.get();
    dispatch(customersReceived(content));
  } catch (error) {
    dispatch(customersRequestFailed(error.message));
  }
};

export const createCustomer = (payload) => async (dispatch) => {
  dispatch(customerCreateRequested());
  try {
    await customersService.create(payload);
    dispatch(customerCreated(payload));
  } catch (error) {
    dispatch(customerCreateFailed(error.message));
  }
};

export const removeCustomers = (id) => async (dispatch) => {
  dispatch(customersRemoveRequested());
  try {
    const { content } = await customersService.remove(id);
    if (content === null) {
      dispatch(customersRemoved(id));
    }
  } catch (error) {
    dispatch(customersRemoveFailed());
  }
};

export const updateCustomer = (id, payload) => async (dispatch) => {
  dispatch(customersUpdateRequested());
  try {
    const { content } = await customersService.update(id, payload);
    dispatch(customerUpdated(content));
    return content;
  } catch (error) {
    customerUpdateFailed(error.message);
  }
};

export const getCustomers = () => (state) => state.customers.entities;
export const getCustomerById = (id) => (state) =>
  state.customers.entities?.find((customer) => customer._id === id);
export const getCustomersLoadingStatus = () => (state) =>
  state.customers.isLoading;

export default customersReducer;
