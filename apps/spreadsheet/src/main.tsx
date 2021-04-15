import React from "react";
import ReactDOM from "react-dom";
import FlatProviders from "react-flat-providers";

import App from "./app/app";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@spreadsheet/components";

ReactDOM.render(
  <React.StrictMode>
    <FlatProviders providers={[[Provider, { store }], BrowserRouter]}>
      <App />
    </FlatProviders>
  </React.StrictMode>,
  document.getElementById("root"),
);
