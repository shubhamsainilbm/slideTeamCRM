import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./scss/style.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Redux Store
import { Provider } from "react-redux";
import { store } from "./app/store";
import ChatProvider from "./context/ChatProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ChatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </Provider>
  </StrictMode>
);
