import React, { useState, useEffect } from 'react'
import { Box, Button, Stack, Typography, TextField, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { api } from '../constants'

type Props = {
  type: 'add' | 'edit'
}

const validationSchema = yup.object({
  name: yup.string()
    .min(6, 'Name must be at least 6 characters')
    .max(10, 'Name must be at most 10 characters')
    .required('Name is required'),
  email: yup.string()
    .email()
    .required('Email is required'),
  phone: yup.string()
    .matches(/^[8-9]\d{7}$/, { message: 'Phone number must be 8 digits long and start with 8 or 9' })
    .required('Phone is required'),
  gender: yup.string().required('Gender is required')
})

const AddEditEmployee = ({ type }: Props) => {
  const navigate = useNavigate()
  const { id: employeeId } = useParams()

  useEffect(() => {
    if (type === 'edit' && employeeId) {
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
  }, [employeeId])

  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    gender: ''
  })

  const formik = useFormik({
    initialValues: employee,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const { name, email, phone, gender } = values
      if (type === 'add') {
        try {
          await axios.post(`${api.employees}`, {
            name,
            email_address: email,
            phone_number: phone,
            gender,
          })
          window.alert('Employee was created successfully')
          navigate('/employees')
        } catch (error) {
          console.error(error)
        }
      } else {
        try {
          await axios.put(`${api.employees}${employeeId}`, {
            name,
            email_address: email,
            phone_number: phone,
            gender,
          })
          window.alert('Employee was edited successfully')
          navigate('/employees')
        } catch (error) {
          console.error(error)
        }
      }
    }
  })

  return (
    <Box>
      <Typography variant="h4">{type === 'add' ? 'Add an' : 'Edit'} employee</Typography>

      <Box sx={{ my: 2, maxWidth: 600 }}>
        <form onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit(e)
        }}>
          <Stack rowGap={2}>
            <TextField
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              id="phone"
              name="phone"
              label="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />

            <TextField
              id="email"
              name="email"
              label="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

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
