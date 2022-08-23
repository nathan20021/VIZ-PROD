import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import allReducers from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
const store = configureStore(
  { reducer: allReducers },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
