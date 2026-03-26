import {
  createEntityAdapter,
  createSlice,
  type EntityState,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Property } from "./types";
import { mockData } from "./mockData";

type PropertiesState = EntityState<Property, string> & {
  searchQuery: string;
};

export const propertiesAdapter = createEntityAdapter<Property, string>({
  selectId: (property) => property.id,
});

const initialState: PropertiesState = propertiesAdapter.setAll(
  propertiesAdapter.getInitialState({
    searchQuery: "",
  }),
  mockData
);

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const entity = state.entities[id];
      if (entity) {
        propertiesAdapter.updateOne(state, {
          id,
          changes: { status: !entity.status },
        });
      }
    },
    updateProperty: (state, action: PayloadAction<Property>) => {
      propertiesAdapter.upsertOne(state, action.payload);
    },
  },
});

export const { setSearchQuery, toggleStatus, updateProperty } = propertiesSlice.actions;
export default propertiesSlice.reducer;
