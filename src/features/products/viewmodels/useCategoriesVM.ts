import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { fetchCategories } from "../models/categoriesSlice";
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesStatus,
} from "../models/categoriesSelectors";

export const useCategoriesVM = () => {
  const dispatch = useAppDispatch();
  const dispatched = useRef(false);
  const categories = useAppSelector(selectCategories);
  const status = useAppSelector(selectCategoriesStatus);
  const error = useAppSelector(selectCategoriesError);

  useEffect(() => {
    if (status === "idle" && !dispatched.current) {
      dispatched.current = true;
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  return {
    categories,
    isLoading: status === "loading",
    isError: status === "failed",
    error,
  };
};

