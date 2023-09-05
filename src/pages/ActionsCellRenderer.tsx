import React from 'react'
import { Stack, Button } from '@mui/material'

type Props = {
  onClickEdit: () => void
  onClickDelete: () => void
}

const ActionsCellRenderer = ({ onClickEdit, onClickDelete }: Props) => {
  return (
    <Stack direction={'row'} columnGap={2} sx={{my: 1}}>
      <Button variant="contained" onClick={onClickEdit}>Edit</Button>
      <Button variant="contained" color="error" onClick={onClickDelete}>Delete</Button>
    </Stack>
  )
}

export default ActionsCellRenderer
