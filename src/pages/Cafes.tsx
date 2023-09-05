import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { setHelloAction } from '../store/testSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const Cafes = () => {
  const dispatch = useDispatch()
  const test = useSelector((state: any) => state.test)
  const [searchParams] = useSearchParams()
  const location = searchParams.get('location')

  console.log('location query', location)

  useEffect(() => {
    axios.get(`http://localhost:3001/cafes${location ? `?location=${location}` : ''}`)
      .then(res => {
        console.log('res', res.data)
        dispatch(setHelloAction('taco'))
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <Box sx={{border: '1px solid red'}}>
      Cafes
      <Button variant="contained">Click me</Button>
      {test.hello}
    </Box>
  )
}

export default Cafes
