import { createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { Property } from "./type";
import { mockData } from "./mockData";

type PropertiesState = {
    items: Property[];
    searchQuery: string;
};

const initialState: PropertiesState = {
    items: mockData,
    searchQuery: "",
};

const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        toggleStatus: (state, action: PayloadAction<string>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) {
                item.status = !item.status;
            }
        },
        updateProperty: (state, action: PayloadAction<Property>) => {
            const index = state.items.findIndex((i) => i.id === action.payload.id);
            if (index != -1) {
                state.items[index] = action.payload;
            }
        }
    }
});

export const { setSearchQuery, toggleStatus, updateProperty } = propertiesSlice.actions;
export default propertiesSlice.reducer;