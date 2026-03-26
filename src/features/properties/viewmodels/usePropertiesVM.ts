import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { ColDef } from "ag-grid-community";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { selectFilteredProperties, selectSearchQuery } from "../models/selectors";
import { setSearchQuery, toggleStatus } from "../models/propertiesSlice";
import type { Property } from "../models/types";

export function usePropertiesVM() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const properties = useAppSelector(selectFilteredProperties);
  const searchQuery = useAppSelector(selectSearchQuery);

  const handleSearchChange = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  const handleToggleStatus = useCallback(
    (id: string) => {
      dispatch(toggleStatus(id));
    },
    [dispatch]
  );

  const onEditProperty = useCallback(
    (propertyId: string) => {
      navigate(`/edit/${propertyId}`);
    },
    [navigate]
  );

  const columnDefs: ColDef<Property>[] = useMemo(
    () => [
      { field: "key", headerName: "Key", flex: 1, minWidth: 150 },
      { field: "type", headerName: "Type", width: 120 },
      { field: "value", headerName: "Value", flex: 1, minWidth: 130 },
      { field: "defaultValue", headerName: "Default Value", flex: 1, minWidth: 130 },
      { field: "groupName", headerName: "Group Name", width: 140 },
      { field: "description", headerName: "Description", flex: 2, minWidth: 200 },
      { field: "status", headerName: "Status", width: 100, cellRenderer: "statusToggle" },
      {
        headerName: "Actions",
        width: 100,
        cellRenderer: "actionsCell",
        sortable: false,
        filter: false,
      },
    ],
    []
  );

  const defaultColDef: ColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
    }),
    []
  );

  return {
    properties,
    searchQuery,
    columnDefs,
    defaultColDef,
    onSearchChange: handleSearchChange,
    onToggleStatus: handleToggleStatus,
    onEditProperty,
  };
}
