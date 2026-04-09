import type { ReactNode } from "react";
import type { Category } from "../../models/types";

type CategoryFilterProps = {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  selectedCategory: string | null;
  onSelect: (categorySlug: string | null) => void;
};

export function CategoryFilter({
  categories,
  isLoading,
  isError,
  error,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) {
  if (isLoading) {
    return (
      <div className="mb-6 text-gray-600 text-sm">Loading categories...</div>
    );
  }

  if (isError) {
    return (
      <div className="mb-6 text-red-600 text-sm">
        Failed to load categories: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <CategoryChip
        active={selectedCategory === null}
        onClick={() => onSelect(null)}
      >
        All
      </CategoryChip>

      {categories.map((c) => (
        <CategoryChip
          key={c.slug}
          active={selectedCategory === c.slug}
          onClick={() => onSelect(c.slug)}
        >
          {c.name}
        </CategoryChip>
      ))}
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

