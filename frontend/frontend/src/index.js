import React from "react";
import ReactDOM from "react-dom/client";  // Правильный импорт
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Создание root с использованием createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);

serviceWorker.unregister();
