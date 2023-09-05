import cafesReducer from "./cafeSlice";
import employeesReducer from "./employeeSlice";
import { CafesStateType, EmployeesStateType } from "./types";

export type StateType = {
  // Reducers types here
  cafes: CafesStateType;
  employees: EmployeesStateType;
};

const rootReducers = {
  // Reducers here
  cafes: cafesReducer,
  employees: employeesReducer,
};

export default rootReducers;
