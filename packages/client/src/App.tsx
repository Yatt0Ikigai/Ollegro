import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { HomePage, SearchPage, OffertPage, LoginPage, RegisterPage, GeneralSettingsPage, BoughtProductsPage } from "./modules";
import "./global-styles/style.scss";

import "./index.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/offert/:id" element={<OffertPage />} />
      <Route path="/listings" element={<SearchPage />} />
      <Route path="/cathegory/:id" element={<SearchPage />} />
      <Route path="/my-ollegro">
        <Route path="settings" element={<GeneralSettingsPage />}/>
        <Route path="bought-products" element={<BoughtProductsPage />}/>
      </Route>
    </Routes>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("app"));
