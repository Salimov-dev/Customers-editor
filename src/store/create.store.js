import customersReducer from "./customer.store";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  customers: customersReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
