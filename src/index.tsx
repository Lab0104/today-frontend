import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export const persistor = persistStore(store);

// import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
// const queryClient = new QueryClient({
//   queryCache: new QueryCache(),
// });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
