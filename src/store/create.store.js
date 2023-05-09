import customersReducer from "./customer.store";
import selectedCustomersReducer from "./selected-customers.store";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  customers: customersReducer,
  selectedCustomers: selectedCustomersReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
