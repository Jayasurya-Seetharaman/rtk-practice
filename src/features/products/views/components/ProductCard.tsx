import type { Product } from "../../models/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col">
      <div className="h-48 flex items-center justify-center mb-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
        {product.title}
      </h3>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-lg font-bold text-blue-600">
          ${product.price.toFixed(2)}
        </span>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>⭐ {product.rating.toFixed(1)}</span>
        </div>
      </div>
      <span className="mt-2 inline-block text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1 w-fit">
        {product.category}
      </span>
    </div>
  );
}