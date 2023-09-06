import { useState, useEffect } from 'react'
import { Box, Button, Stack, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { api } from '../../constants'
import FormikTextField from '../../components/FormikTextField'
import { formikTextFields, yupValidationSchema, EMPLOYEE_FORM_TYPE } from './formConstants'

type Props = {
  type: EMPLOYEE_FORM_TYPE
}

const AddEditEmployee = ({ type }: Props) => {
  const navigate = useNavigate()
  const { id: employeeId } = useParams()

  useEffect(() => {
    if (type === EMPLOYEE_FORM_TYPE.EDIT && employeeId) {
      try {
        axios.get(`${api.employees}${employeeId}`)
          .then(res => {
            const { name, email_address, phone_number, gender } = res.data
            setEmployee({ name, email: email_address, phone: phone_number, gender })
          })
      } catch (error) {
        console.error(error)
      }
    }
  }, [type, employeeId])

  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    gender: ''
  })

  const handleSubmit = async ({ name, email, phone, gender }: { name: string, email: string, phone: string, gender: string }) => {
    let reqBody = {
      name,
      email_address: email,
      phone_number: phone,
      gender,
    }
    try {
      if (type === EMPLOYEE_FORM_TYPE.ADD) {
        await axios.post(`${api.employees}`, reqBody)
        window.alert('Employee was created successfully')
      } else {
        await axios.put(`${api.employees}${employeeId}`, reqBody)
        window.alert('Employee was edited successfully')
      }
      navigate('/employees')
    } catch (error) {
      console.error(error)
    }
  }

  const formik = useFormik({
    initialValues: employee,
    enableReinitialize: true,
    validationSchema: yupValidationSchema,
    onSubmit: handleSubmit
  })

  return (
    <Box>
      <Typography variant="h4">{type === EMPLOYEE_FORM_TYPE.ADD ? 'Add an' : 'Edit'} employee</Typography>

      <Box sx={{ my: 2, maxWidth: 600 }}>
        <form onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit(e)
        }}>
          <Stack rowGap={2}>
            {formikTextFields.map(({ field, label }) => {
              return (
                <FormikTextField
                  key={field}
                  field={field}
                  label={label}
                  formik={formik}
                />
              )
            })}

            <FormControl component="fieldset">
              <RadioGroup name="gender" value={formik.values.gender} onChange={(e) => formik.setFieldValue('gender', e.target.value)}>
                <FormControlLabel control={<Radio />} label="Male" value="Male" />
                <FormControlLabel control={<Radio />} label="Female" value="Female"/>
              </RadioGroup>
            </FormControl>
          </Stack>

          <Stack direction={'row'} columnGap={2} sx={{mt: 2}}>
            <Button color="primary" variant="contained" type="submit">Submit</Button>
            <Button color="error" component="a" href="/employees">Cancel</Button>
          </Stack>
        </form>
      </Box>
    </Box>
  )
}

export default AddEditEmployee
