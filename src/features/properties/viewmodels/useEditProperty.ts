import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { selectPropertyById } from "../models/selectors";
import { updateProperty } from "../models/propertiesSlice";
import type { Property } from "../../properties/models/type";

export function useEditProperty() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const property = useAppSelector(selectPropertyById(id ?? ""));

  const handleSave = useCallback(
    (updatedProperty: Property) => {
      dispatch(updateProperty(updatedProperty));
      navigate("/");
    },
    [dispatch, navigate]
  );

  const handleCancel = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return {
    property,
    handleSave,
    handleCancel,
  };
}