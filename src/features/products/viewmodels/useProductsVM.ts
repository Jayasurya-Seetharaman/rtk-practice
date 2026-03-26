import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { fetchProducts } from "../models/thunks";
import {
  selectProducts,
  selectProductsStatus,
  selectProductsError,
} from "../models/selectors";

export const useProductsVM = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return {
    products,
    isLoading: status === "loading",
    isError: status === "failed",
    error,
  };
};