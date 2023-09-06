import { useState, useEffect } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { api } from '../../constants'
import FormikTextField from '../../components/FormikTextField'
import { yupValidationSchema, formikTextFields, CAFE_FORM_TYPE } from './formConstants'

type Props = {
  type: CAFE_FORM_TYPE
}

const AddEditCafe = ({ type }: Props) => {
  const navigate = useNavigate()
  const { id: cafeId } = useParams()

  useEffect(() => {
    if (type === CAFE_FORM_TYPE.EDIT && cafeId) {
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
  }, [type, cafeId])

  const [cafe, setCafe] = useState({
    name: '',
    description: '',
    location: ''
  })


  const formik = useFormik({
    initialValues: cafe,
    enableReinitialize: true,
    validationSchema: yupValidationSchema,
    onSubmit: async (values) => {
      const { name, description, location } = values
      if (type === CAFE_FORM_TYPE.ADD) {
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
            {formikTextFields.map(({ field, label, multiline, rows }) => {
              return (
                <FormikTextField key={field} field={field} label={label} formik={formik} multiline={multiline} rows={rows} />
              )
            })}
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
