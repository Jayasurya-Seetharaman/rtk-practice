import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";


import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import type { Property } from "../../models/type";
import { StatusToggle } from "./StatusToggle";
import { ActionsCell } from "./ActionsCell";

ModuleRegistry.registerModules([AllCommunityModule]);

interface PropertiesTableProps {
  properties: Property[];
  columnDefs: ColDef<Property>[];
  defaultColDef: ColDef;
  onToggleStatus: (id: string) => void;
}

export function PropertiesTable({
  properties,
  columnDefs,
  defaultColDef,
  onToggleStatus,
}: PropertiesTableProps) {
  const components = useMemo(
    () => ({
      statusToggle: (props: any) => (
        <StatusToggle {...props} onToggle={onToggleStatus} />
      ),
      actionsCell: ActionsCell,
    }),
    [onToggleStatus]
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