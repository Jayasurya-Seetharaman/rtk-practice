import { BrowserRouter, Routes, Route, useParams, useNavigate } from "react-router-dom";
import { Security } from "@okta/okta-react";
import { PropertiesList, EditProperty } from "../../features/properties";
import { ProductsPage } from "../../features/products";
import { oktaAuth, LoginCallback, LoginPage, ProfilePage, ProtectedRoute } from "../../features/auth";
import { MainLayout } from "../layouts/MainLayout";
import { NotFoundPage } from "../pages/NotFoundPage";

function EditPropertyRoute() {
  const { id } = useParams();
  return <EditProperty key={id ?? ""} />;
}

function AppRoutes() {
  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: string) => {
    navigate(originalUri || "/", { replace: true });
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/callback" element={<LoginCallback />} />

        {/* Protected routes with layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<PropertiesList />} />
            <Route path="/edit/:id" element={<EditPropertyRoute />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* 404 — catches all unmatched routes inside layout */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </Security>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}