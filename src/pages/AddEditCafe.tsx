import React from 'react'
import { Box, Typography } from '@mui/material'

type Props = {
  type: 'add' | 'edit'
}

const AddEditCafe = ({ type }: Props) => {
  return (
    <Box>
      <Typography variant="h4">{type === 'add' ? 'Add a' : 'Edit'} cafe</Typography>
    </Box>
  )
}

export default AddEditCafe
