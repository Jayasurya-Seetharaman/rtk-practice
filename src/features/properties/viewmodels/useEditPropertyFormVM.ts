import { useCallback, useState, type FormEvent } from "react";
import type { Property } from "../models/types";

export function useEditPropertyFormVM(
  property: Property | undefined,
  onSave: (updated: Property) => void
) {
  const [formData, setFormData] = useState<Property | null>(() =>
    property ? { ...property } : null
  );

  const handleFieldChange = useCallback((field: keyof Property, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } as Property : prev));
  }, []);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (formData) {
        onSave(formData);
      }
    },
    [formData, onSave]
  );

  return {
    formData,
    handleFieldChange,
    onSubmit,
  };
}
