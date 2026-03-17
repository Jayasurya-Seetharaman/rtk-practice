import type { ICellRendererParams } from "ag-grid-community";
import type { Property } from "../../models/type";

interface StatusToggleProps extends ICellRendererParams<Property> {
  onToggle: (id: string) => void;
}

export function StatusToggle({ data, onToggle }: StatusToggleProps) {
  if (!data) return null;

  return (
    <button
      role="switch"
      aria-checked={data.status}
      onClick={() => onToggle(data.id)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        data.status ? "bg-gray-800" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
          data.status ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}