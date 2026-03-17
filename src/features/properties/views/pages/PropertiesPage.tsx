import { useProperties } from "../../viewmodels/useProperties";
import { SearchBar } from "../components/SearchBar";
import { PropertiesTable } from "../components/PropertiesTable";

export function PropertiesPage() {
  const {
    properties,
    searchQuery,
    columnDefs,
    defaultColDef,
    handleSearchChange,
    handleToggleStatus,
  } = useProperties();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">App Properties</h1>
      <SearchBar value={searchQuery} onChange={handleSearchChange} />
      <PropertiesTable
        properties={properties}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
}