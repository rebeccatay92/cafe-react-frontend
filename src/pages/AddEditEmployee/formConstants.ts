import * as yup from "yup";

export const yupValidationSchema = yup.object({
  name: yup
    .string()
    .min(6, "Name must be at least 6 characters")
    .max(10, "Name must be at most 10 characters")
    .required("Name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup
    .string()
    .matches(/^[8-9]\d{7}$/, {
      message: "Phone number must be 8 digits long and start with 8 or 9",
    })
    .required("Phone is required"),
  gender: yup.string().required("Gender is required"),
});

export const formikTextFields = [
  {
    field: "name",
    label: "Name",
  },
  {
    field: "phone",
    label: "Phone",
  },
  {
    field: "email",
    label: "Email",
  },
];

export enum EMPLOYEE_FORM_TYPE {
  ADD = "add",
  EDIT = "edit",
}
