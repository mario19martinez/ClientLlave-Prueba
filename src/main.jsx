import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": import.meta.env.VITE_APP_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
};

Modal.setAppElement("#root");
const rootElement = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(rootElement);

reactRoot.render(
  <Provider store={store}>
    <React.StrictMode>
      <PayPalScriptProvider options={initialOptions}>
        <App />
      </PayPalScriptProvider>
    </React.StrictMode>
  </Provider>
);
