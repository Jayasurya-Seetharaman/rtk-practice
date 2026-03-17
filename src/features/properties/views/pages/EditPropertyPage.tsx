import { useState, useEffect } from "react";
import { useEditProperty } from "../../viewmodels/useEditProperty";
import type { Property } from "../../models/type";

export function EditPropertyPage() {
  const { property, handleSave, handleCancel } = useEditProperty();

  const [formData, setFormData] = useState<Property | null>(null);

  useEffect(() => {
    if (property) {
      setFormData({ ...property });
    }
  }, [property]);

  if (!property) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  if (!formData) return null;

  const handleFieldChange = (field: keyof Property, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      handleSave(formData);
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Property</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Key
          </label>
          <input
            type="text"
            value={formData.key}
            onChange={(e) => handleFieldChange("key", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleFieldChange("type", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Boolean">Boolean</option>
            <option value="String">String</option>
            <option value="Integer">Integer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Value
          </label>
          <input
            type="text"
            value={formData.value}
            onChange={(e) => handleFieldChange("value", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Value
          </label>
          <input
            type="text"
            value={formData.defaultValue}
            onChange={(e) => handleFieldChange("defaultValue", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Group Name
          </label>
          <select
            value={formData.groupName}
            onChange={(e) => handleFieldChange("groupName", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="JAVA">JAVA</option>
            <option value="DATABASE">DATABASE</option>
            <option value="UI">UI</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}