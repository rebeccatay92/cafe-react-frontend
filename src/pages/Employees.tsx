import React, { useEffect, useMemo, useCallback } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community'
import { selectEmployees, setEmployeesAction } from '../store/employeeSlice'

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import ActionsCellRenderer from './ActionsCellRenderer'

import dayjs from 'dayjs'

const Employees = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const cafe = searchParams.get('cafe')

  const gridRef = React.createRef<AgGridReact>();

  const employees = useSelector(selectEmployees)

  const columnDefs: ColDef[] = useMemo(() => {
    return [
      {
        field: 'Employee ID', resizable: true,
        width: 150,
        cellRenderer: (params: ICellRendererParams) => params.data.id
      },
      { field: 'name', resizable: true, width: 100, },
      {
        field: 'Email',
        resizable: true,
        cellRenderer: (params: ICellRendererParams) => params.data.email_address
      },
      {
        field: 'Phone',
        resizable: true,
        width: 150,
        cellRenderer: (params: ICellRendererParams) => params.data.phone_number
      },
      {
        field: 'Days worked',
        resizable: true,
        width: 150,
        cellRenderer: (params: ICellRendererParams) => {
          let startDate = dayjs(params.data.start_date)
          let currentDate = dayjs()
          let difference = currentDate.diff(startDate, 'day')
          return difference
        }
      },
      { field: 'cafe', resizable: true },
      {
        field: 'actions',
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <ActionsCellRenderer
              editLink={`/employees/${params.data._id}`}
              onClickDelete={async () => { }}
            />
          )
        }
      }
    ]
  }, [])

  const defaultColDef = useMemo(()=> ({
    sortable: false
  }), []);

  useEffect(() => {
    // fetch employees
    axios.get(`http://localhost:3001/employees${cafe ? `?cafe=${cafe}` : ''}`)
      .then(res => {
        dispatch(setEmployeesAction(res.data))
      })
    .catch(err => console.error(err))
  }, [dispatch, cafe])

  return (
    <Box>
      <Typography variant="h4">Employees</Typography>

      <Button variant="contained" sx={{ my: 2 }} component='a' href="/employees/new">Add new employee</Button>

      <div className='ag-theme-alpine' style={{ width: '100%', height: 800 }}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={employees} // Row Data for Rows
          rowHeight={64} // Optional - Set row height for rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
        />
      </div>
    </Box>
  )
}

export default Employees
