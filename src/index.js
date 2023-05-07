import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from 'react-redux';
import { createStore } from "./store/create.store";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore();
root.render( <Provider store={store}><App /></Provider>);
