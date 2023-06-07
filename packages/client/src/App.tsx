import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import { trpc } from "./utils/trpc";
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  HomePage,
  SearchPage,
  OffertPage,
  LoginPage,
  RegisterPage,
  GeneralSettingsPage,
  BoughtProductsPage,
  MyOffertsPage,
  CreateOffertPage,
  AdminPage,
  MailPage
} from "./modules";
import Cookies from "js-cookie";

import "./global-styles/style.scss";

import "./index.css";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8080/trpc',
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/offert/:id" element={<OffertPage />} />
            <Route path="/listings" element={<SearchPage />} />
            <Route path="/cathegory/:cathegoryId" element={<SearchPage />} />
            <Route path="/my-ollegro">
              <Route path="settings" element={<GeneralSettingsPage />} />
              <Route path="bought-products" element={<BoughtProductsPage />} />
              <Route path="offerts" element={<MyOffertsPage />} />
              <Route path="create-offert" element={<CreateOffertPage />} />
              <Route path="mail" element={<MailPage/>} />
            </Route>
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider >
  );
};


ReactDOM.render(<App />, document.getElementById("app"));
