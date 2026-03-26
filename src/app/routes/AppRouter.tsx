import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { PropertiesList, EditProperty } from "../../features/properties";

function EditPropertyRoute() {
  const { id } = useParams();
  return <EditProperty key={id ?? ""} />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PropertiesList />} />
        <Route path="/edit/:id" element={<EditPropertyRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
