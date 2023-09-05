import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmployeesStateType, EMPLOYEES } from "./types";

const initialState: EmployeesStateType = {
  all: {},
  index: {
    items: [],
  },
};

export const employeeSlice = createSlice({
  name: EMPLOYEES,
  initialState,
  reducers: {
    setEmployeesAction: (
      state: EmployeesStateType,
      action: PayloadAction<Array<object>>
    ) => {
      state.index.items = action.payload.map((employee: any) => employee._id);
      action.payload.forEach((employee: any) => {
        state.all[employee._id] = employee;
      });
    },
    deleteEmployeeAction: (
      state: EmployeesStateType,
      action: PayloadAction<string>
    ) => {
      state.index.items = state.index.items.filter(
        (id: string) => id !== action.payload
      );
      delete state.all[action.payload];
    },
  },
});

const selectEmployeesAll = (state: { employees: EmployeesStateType }) =>
  state.employees.all;
const selectEmployeesIndex = (state: { employees: EmployeesStateType }) =>
  state.employees.index;

export const selectEmployees = createSelector(
  [selectEmployeesAll, selectEmployeesIndex],
  (all, index) => {
    return index.items.map((id: string) => all[id]);
  }
);
export const { setEmployeesAction, deleteEmployeeAction } =
  employeeSlice.actions;
export default employeeSlice.reducer;
