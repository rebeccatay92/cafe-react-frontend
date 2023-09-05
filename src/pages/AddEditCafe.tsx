import React, { useState, useEffect } from 'react'
import { Box, Button, Stack, Typography, TextField } from '@mui/material'
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
  description: yup.string()
    .max(256, 'Description must be at most 256 characters')
    .required('Description is required'),
  location: yup.string()
    .max(256, 'Location must be at most 256 characters')
    .required('Location is required'),
})

const AddEditCafe = ({ type }: Props) => {
  const navigate = useNavigate()
  const { id: cafeId } = useParams()

  useEffect(() => {
    if (type === 'edit' && cafeId) {
      try {
        axios.get(`${api.cafes}${cafeId}`)
          .then(res => {
            const { name, description, location } = res.data
            setCafe({ name, description, location })
          })
      } catch (error) {
        console.error(error)
      }
    }
  }, [cafeId])

  const [cafe, setCafe] = useState({
    name: '',
    description: '',
    location: ''
  })


  const formik = useFormik({
    initialValues: cafe,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const { name, description, location } = values
      if (type === 'add') {
        try {
          await axios.post(api.cafes, {
            name,
            description,
            location
          })
          window.alert('Cafe was created successfully')
          navigate('/cafes')
        } catch (error) {
          console.error(error)
        }
      } else {
        try {
          await axios.put(`${api.cafes}${cafeId}`, {
            name,
            description,
            location
          })
          window.alert('Cafe was edited successfully')
          navigate('/cafes')
        } catch (error) {
          console.error(error)
        }
      }
    }
  })

  return (
    <Box>
      <Typography variant="h4">{type === 'add' ? 'Add a' : 'Edit'} cafe</Typography>

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
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <TextField
              id="location"
              name="location"
              label="Location"
              multiline
              rows={2}
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
          </Stack>

          <Stack direction={'row'} columnGap={2} sx={{mt: 2}}>
            <Button color="primary" variant="contained" type="submit">Submit</Button>
            <Button color="error" component="a" href="/cafes">Cancel</Button>
          </Stack>
        </form>
      </Box>
    </Box>
  )
}

export default AddEditCafe
