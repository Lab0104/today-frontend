import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/Store";

import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  // {
  //   onError: (error, query) => {
  //     console.log("onError", error);
  //   },
  //   onSuccess: (data) => {
  //     console.log("onSuccess", data);
  //   },
  // }
});

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
