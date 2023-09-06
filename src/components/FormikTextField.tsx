import { TextField as MuiTextField } from '@mui/material'
import { FormikProps } from 'formik'

type Props = {
  label: string
  field: string
  formik: FormikProps<any>,
  multiline?: boolean,
  rows?: number
}

const FormikTextField = ({ label, field, formik, multiline = false, rows = 1 }: Props) => {
  return (
    <MuiTextField
      id={field}
      name={field}
      label={label}
      value={formik.values[field]}
      multiline={multiline}
      rows={rows}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[field] && Boolean(formik.errors[field])}
      helperText={formik.touched[field] && formik.errors[field] && `${formik.errors[field]}`}
    />
  )
}

export default FormikTextField
