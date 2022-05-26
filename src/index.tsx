import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StoreProvider } from "./store";
import { createStore } from "./store/store";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SupabaseWrapper } from "./config/SupabaseInit";

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider store={store}>
      <SupabaseWrapper>
          <App />
        </SupabaseWrapper>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
