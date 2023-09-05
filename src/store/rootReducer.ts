import testReducer from "./testSlice";
import { TestsStateType } from "./types";


export type StateType = {
  // Reducers types here
  tests: TestsStateType;
};

const rootReducers = {
  // Reducers here
  test: testReducer
};

export default rootReducers;
