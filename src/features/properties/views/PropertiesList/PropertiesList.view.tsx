import type { ColDef } from "ag-grid-community";
import type { Property } from "../../models/types";
import { SearchBar } from "../components/SearchBar";
import { PropertiesTable } from "../components/PropertiesTable";

export interface PropertiesListViewProps {
  properties: Property[];
  searchQuery: string;
  columnDefs: ColDef<Property>[];
  defaultColDef: ColDef;
  isAdmin: boolean;
  onSearchChange: (value: string) => void;
  onToggleStatus: (id: string) => void;
  onEditProperty: (id: string) => void;
}

export function PropertiesListView({
  properties,
  searchQuery,
  columnDefs,
  defaultColDef,
  isAdmin,
  onSearchChange,
  onToggleStatus,
  onEditProperty,
}: PropertiesListViewProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">App Properties</h1>
      <SearchBar value={searchQuery} onChange={onSearchChange} />
      <PropertiesTable
        properties={properties}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        isAdmin={isAdmin}
        onToggleStatus={onToggleStatus}
        onEditProperty={onEditProperty}
      />
    </div>
  );
}
