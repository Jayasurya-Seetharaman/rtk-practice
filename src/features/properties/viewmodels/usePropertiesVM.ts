import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { ColDef } from "ag-grid-community";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { selectFilteredProperties, selectSearchQuery } from "../models/selectors";
import { selectUserRole } from "../../auth/models/selectors";
import { setSearchQuery, toggleStatus } from "../models/propertiesSlice";
import type { Property } from "../models/types";
import { useAlert } from "../../../app/context/AlertContext";

export function usePropertiesVM() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const properties = useAppSelector(selectFilteredProperties);
  const searchQuery = useAppSelector(selectSearchQuery);
  const userRole = useAppSelector(selectUserRole);
  const isAdmin = userRole === 'admin';

  const handleSearchChange = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  const handleToggleStatus = useCallback(
    (id: string) => {
      dispatch(toggleStatus(id));
      showAlert('success', 'Property status updated');
    },
    [dispatch, showAlert]
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
      ...(isAdmin
        ? [
            {
              headerName: "Actions",
              width: 100,
              cellRenderer: "actionsCell",
              sortable: false,
              filter: false,
            } as ColDef<Property>,
          ]
        : []),
    ],
    [isAdmin]
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
    isAdmin,
    onSearchChange: handleSearchChange,
    onToggleStatus: handleToggleStatus,
    onEditProperty,
  };
}
