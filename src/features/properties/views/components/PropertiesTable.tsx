import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";


import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import type { Property } from "../../models/types";
import { StatusToggle } from "./StatusToggle";
import { ActionsCell } from "./ActionsCell";

ModuleRegistry.registerModules([AllCommunityModule]);

interface PropertiesTableProps {
  properties: Property[];
  columnDefs: ColDef<Property>[];
  defaultColDef: ColDef;
  isAdmin: boolean;
  onToggleStatus: (id: string) => void;
  onEditProperty: (id: string) => void;
}

export function PropertiesTable({
  properties,
  columnDefs,
  defaultColDef,
  isAdmin,
  onToggleStatus,
  onEditProperty,
}: PropertiesTableProps) {
  const components = useMemo(
    () => ({
      statusToggle: (props: ICellRendererParams<Property>) => (
        <StatusToggle {...props} isAdmin={isAdmin} onToggle={onToggleStatus} />
      ),
      actionsCell: (props: ICellRendererParams<Property>) => (
        <ActionsCell {...props} onEdit={onEditProperty} />
      ),
    }),
    [isAdmin, onToggleStatus, onEditProperty]
  );

  return (
    <div className="ag-theme-alpine w-full h-[400px]" style={{ height: 400, width: '100%' }}>
      <AgGridReact<Property>
        rowData={properties}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        components={components}
        animateRows={true}
        getRowId={(params) => params.data.id}
      />
    </div>
  );
}