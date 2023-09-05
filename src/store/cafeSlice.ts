import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CafesStateType, CAFES } from "./types";

const initialState: CafesStateType = {
  all: {},
  index: {
    items: [],
  },
};

export const cafeSlice = createSlice({
  name: CAFES,
  initialState,
  reducers: {
    setCafesAction: (
      state: CafesStateType,
      action: PayloadAction<Array<object>>
    ) => {
      state.index.items = action.payload.map((cafe: any) => cafe._id);
      action.payload.forEach((cafe: any) => {
        state.all[cafe._id] = cafe;
      });
    },
    deleteCafeAction: (
      state: CafesStateType,
      action: PayloadAction<string>
    ) => {
      state.index.items = state.index.items.filter(
        (_id: string) => _id !== action.payload
      );
      delete state.all[action.payload];
    },
  },
});

const selectCafesAll = (state: { cafes: CafesStateType }) => state.cafes.all;
const selectCafesIndex = (state: { cafes: CafesStateType }) =>
  state.cafes.index;

export const selectCafes = createSelector(
  [selectCafesAll, selectCafesIndex],
  (all, index) => {
    return index.items.map((id: string) => all[id]);
  }
);

export const { setCafesAction, deleteCafeAction } = cafeSlice.actions;
export default cafeSlice.reducer;
