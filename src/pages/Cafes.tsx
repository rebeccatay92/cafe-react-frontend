import React, { useState, useEffect, useMemo } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { setHelloAction } from '../store/testSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import ActionsCellRenderer from './ActionsCellRenderer'

const Cafes = () => {
  const dispatch = useDispatch()
  const test = useSelector((state: any) => state.test)

  const [searchParams] = useSearchParams()
  const location = searchParams.get('location')

  const gridRef = React.createRef<AgGridReact>();
  const [cafes, setCafes] = useState([])
  const columnDefs: ColDef[] = [
    { field: 'name', resizable: true },
    { field: 'description', resizable: true },
    { field: 'employees', resizable: true },
    { field: 'location', filter: true, resizable: true },
    {
      field: 'actions',
      cellRenderer: (params: ICellRendererParams) => {
        return (
          <ActionsCellRenderer
            onClickEdit={() => { console.log('edit', params.data) }}
            onClickDelete={() => { console.log('delete', params.data) }}
          />
        )
      }
    }
  ]
  const defaultColDef = useMemo(()=> ({
    sortable: false
  }), []);

  useEffect(() => {
    axios.get(`http://localhost:3001/cafes${location ? `?location=${location}` : ''}`)
      .then(res => {
        dispatch(setHelloAction('taco'))
        setCafes(res.data)
      })
      .catch(err => console.error(err))
  }, [dispatch, location])

  return (
    <Box sx={{ border: '1px solid red' }}>
      <Typography variant="h4">Cafes</Typography>

      <Button variant="contained" sx={{ my: 2 }} onClick={() => { }}>Add new cafe</Button>

      <div className='ag-theme-alpine' style={{ width: '100%', height: 800 }}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={cafes} // Row Data for Rows
          rowHeight={64} // Optional - Set row height for rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </Box>
  )
}

export default Cafes
