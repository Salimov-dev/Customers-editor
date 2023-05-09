import { createSlice } from "@reduxjs/toolkit";

const customersSlice = createSlice({
  name: "selectedCustomers",
  initialState: {
    entities: [],
    error: null,
  },
  reducers: {
    customerSelected: (state, action) => {
      if (!state.entities.includes(action.payload)) {
        state.entities = [...state.entities, action.payload];
      } else {
        state.entities = state.entities.filter((el) => el !== action.payload);
      }
    },
  },
});

const { reducer: selectedCustomersReducer, actions } = customersSlice;
const { customerSelected } = actions;

export const getSelectedCustomers = () => (state) =>
  state.selectedCustomers.entities;

export const selectCustomers = (id) => (dispatch) => {
  dispatch(customerSelected(id));
};

export default selectedCustomersReducer;
