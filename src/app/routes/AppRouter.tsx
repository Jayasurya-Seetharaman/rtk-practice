import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams, useNavigate } from "react-router-dom";
import { Security } from "@okta/okta-react";
import { PropertiesList, EditProperty } from "../../features/properties";
import { ProductsPage } from "../../features/products";
import { LoginCallback, LoginPage, ProfilePage, ProtectedRoute } from "../../features/auth";
import { useAuthSync } from "../../features/auth/viewmodels/useAuthSync";
import oktaAuth from "../config/oktaConfig";
import { MainLayout } from "../layouts/MainLayout";
import { NotFoundPage } from "../pages/NotFoundPage";
import { useAppSelector } from "../store/hooks";
import { selectUserRole } from "../../features/auth/models/selectors";

function AdminRoute() {
  const role = useAppSelector(selectUserRole);
  if (role === 'viewer') return <Navigate to="/" replace />;
  return <Outlet />;
}

function EditPropertyRoute() {
  const { id } = useParams();
  return <EditProperty key={id ?? ""} />;
}

function SecureRoutes() {
  useAuthSync();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/callback" element={<LoginCallback />} />

      {/* Protected routes with layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<PropertiesList />} />
          <Route element={<AdminRoute />}>
            <Route path="/edit/:id" element={<EditPropertyRoute />} />
            <Route path="/products" element={<ProductsPage />} />
          </Route>
          <Route path="/profile" element={<ProfilePage />} />

          {/* 404 — catches all unmatched routes inside layout */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

function AppRoutes() {
  const navigate = useNavigate();

  const restoreOriginalUri = async (
    _oktaAuth: unknown,
    originalUri: string
  ) => {
    navigate(originalUri || "/", { replace: true });
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <SecureRoutes />
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
