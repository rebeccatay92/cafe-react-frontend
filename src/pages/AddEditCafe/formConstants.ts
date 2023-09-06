import * as yup from "yup";

export const yupValidationSchema = yup.object({
  name: yup
    .string()
    .min(6, "Name must be at least 6 characters")
    .max(10, "Name must be at most 10 characters")
    .required("Name is required"),
  description: yup
    .string()
    .max(256, "Description must be at most 256 characters")
    .required("Description is required"),
  location: yup
    .string()
    .max(256, "Location must be at most 256 characters")
    .required("Location is required"),
});

export const formikTextFields = [
  {
    field: "name",
    label: "Name",
  },
  {
    field: "description",
    label: "Description",
    multiline: true,
    rows: 4,
  },
  {
    field: "location",
    label: "Location",
    multiline: true,
    rows: 2,
  },
];

export enum CAFE_FORM_TYPE {
  ADD = "add",
  EDIT = "edit",
};
