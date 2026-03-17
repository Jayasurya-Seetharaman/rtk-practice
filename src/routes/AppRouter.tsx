import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PropertiesPage, EditPropertyPage } from "../features/properties";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PropertiesPage />} />
        <Route path="/edit/:id" element={<EditPropertyPage />} />
      </Routes>
    </BrowserRouter>
  );
}