export type CafesStateType = {
  all: {
    [key: string]: object;
  };
  index: {
    items: string[];
  };
};

export type EmployeesStateType = {
  all: {
    [key: string]: object;
  };
  index: {
    items: string[];
  };
};

export const CAFES = "cafes";
export const EMPLOYEES = "employees";
