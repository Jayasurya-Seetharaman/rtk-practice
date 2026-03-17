import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../store";

const selectAllProperties = (state: RootState) => state.properties.items;
const selectSearchQuery = (state: RootState) => state.properties.searchQuery;

export const selectFilteredProperties = createSelector([selectAllProperties, selectSearchQuery], 
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

export const selectPropertyById = (id: string) => createSelector([selectAllProperties], (items) =>
    items.find((item) => item.id === id)
);

export { selectSearchQuery, selectAllProperties };