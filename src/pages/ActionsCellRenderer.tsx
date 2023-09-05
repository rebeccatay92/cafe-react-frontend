import React from 'react'
import { Stack, Button } from '@mui/material'

type Props = {
  editLink: string
  onClickDelete: () => void
}

const ActionsCellRenderer = ({ editLink, onClickDelete }: Props) => {
  return (
    <Stack direction={'row'} columnGap={2} sx={{my: 1}}>
      <Button variant="contained" component='a' href={editLink}>Edit</Button>
      <Button variant="contained" color="error" onClick={onClickDelete}>Delete</Button>
    </Stack>
  )
}

export default ActionsCellRenderer
