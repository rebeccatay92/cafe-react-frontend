import React, { useEffect, useMemo, useCallback } from 'react'
import { Box, Button, Chip, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community'
import { selectEmployees, setEmployeesAction, deleteEmployeeAction } from '../store/employeeSlice'

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import ActionsCellRenderer from '../components/ActionsCellRenderer'
import { api } from '../constants'

const Employees = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const cafe = searchParams.get('cafe')

  const gridRef = React.createRef<AgGridReact>();

  const employees = useSelector(selectEmployees)

  const deleteEmployee = useCallback(async (id: string) => {
    let toDelete = window.confirm('Are you sure you want to delete this employee?')
    if (toDelete) {
      try {
        await axios.delete(`http://localhost:3001/employees/${id}`)
        dispatch(deleteEmployeeAction(id))
        window.alert(`Employee deleted successfully`)
      } catch (err) {
        console.error(err)
      }
    }
  }, [dispatch])

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
        cellRenderer: (params: ICellRendererParams) => params.data.days_worked
      },
      { field: 'cafe', resizable: true },
      {
        field: 'actions',
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <ActionsCellRenderer
              editLink={`/employees/${params.data._id}`}
              onClickDelete={async () => {deleteEmployee(params.data._id)}}
            />
          )
        }
      }
    ]
  }, [deleteEmployee])

  const defaultColDef = useMemo(()=> ({
    sortable: false
  }), []);

  useEffect(() => {
    // fetch employees
    axios.get(`${api.employees}${cafe ? `?cafe=${cafe}` : ''}`)
      .then(res => {
        dispatch(setEmployeesAction(res.data))
      })
    .catch(err => console.error(err))
  }, [dispatch, cafe])

  return (
    <Box>
      <Typography variant="h4">Employees</Typography>

      <Button variant="contained" sx={{ my: 2 }} component='a' href="/employees/new">Add new employee</Button>

      <Box>
        {cafe && <Chip label={`Cafe: ${cafe}`} sx={{ my: 2 }} onDelete={() => { setSearchParams({})}}/>}
      </Box>

      <div className='ag-theme-alpine' style={{ width: '100%', height: 800 }}>
        <AgGridReact
          ref={gridRef}
          rowData={employees}
          rowHeight={64}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
        />
      </div>
    </Box>
  )
}

export default Employees
