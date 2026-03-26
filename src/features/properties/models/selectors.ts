import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import type { Property } from "./types";
import { propertiesAdapter } from "./propertiesSlice";

const selectPropertiesState = (state: RootState) => state.properties;

const { selectAll, selectById } = propertiesAdapter.getSelectors(selectPropertiesState);

export const selectAllProperties = selectAll;
export const selectSearchQuery = (state: RootState) => state.properties.searchQuery;

export function selectPropertyById(state: RootState, id: string): Property | undefined {
  return selectById(state, id);
}

export const selectFilteredProperties = createSelector(
  [selectAllProperties, selectSearchQuery],
  (items, searchQuery) => {
    if (!searchQuery.trim()) {
      return items;
    }

    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.key.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.groupName.toLowerCase().includes(query) ||
        item.value.toLowerCase().includes(query)
    );
  }
);
