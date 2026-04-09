import type { ICellRendererParams } from "ag-grid-community";
import type { Property } from "../../models/types";

interface StatusToggleProps extends ICellRendererParams<Property> {
  isAdmin: boolean;
  onToggle: (id: string) => void;
}

export function StatusToggle({ data, isAdmin, onToggle }: StatusToggleProps) {
  if (!data) return null;

  return (
    <button
      role="switch"
      aria-checked={data.status}
      onClick={isAdmin ? () => onToggle(data.id) : undefined}
      disabled={!isAdmin}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        data.status ? "bg-gray-800" : "bg-gray-300"
      } ${!isAdmin ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
          data.status ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}