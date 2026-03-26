import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { selectPropertyById } from "../models/selectors";
import { updateProperty } from "../models/propertiesSlice";
import type { Property } from "../models/types";
import { useEditPropertyFormVM } from "./useEditPropertyFormVM";

export function useEditPropertyVM() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const property = useAppSelector((state) => selectPropertyById(state, id ?? ""));

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

  const { formData, handleFieldChange, onSubmit } = useEditPropertyFormVM(
    property,
    handleSave
  );

  return {
    property,
    handleCancel,
    formData,
    handleFieldChange,
    onSubmit,
  };
}
