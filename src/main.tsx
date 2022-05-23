import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { List } from "./pages/List";
import { Detail } from "./pages/Detail";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { NotFound } from "./pages/NotFound";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <React.StrictMode>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </React.StrictMode>
        }
      >
        <Route index element={<Navigate replace to="/list" />} />
        <Route path="list" element={<List />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
