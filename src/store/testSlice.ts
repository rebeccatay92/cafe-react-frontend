import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TestsStateType, TESTS } from "./types";

const testInitialState: TestsStateType = {
  hello: "world",
};

export const testsSlice = createSlice({
  name: TESTS,
  initialState: testInitialState,
  reducers: {
    setHelloAction: (state: TestsStateType, action: PayloadAction<string>) => {
      state.hello = action.payload;
    },
  },
});

export const { setHelloAction } = testsSlice.actions;
export default testsSlice.reducer;
