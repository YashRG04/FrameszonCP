import React from "react";
import ReactDOM from "react-dom/client";
import "./input.css";
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import Store from "./Redux/Store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
