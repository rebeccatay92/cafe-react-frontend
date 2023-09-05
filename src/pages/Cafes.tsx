import React, { useEffect, useMemo, useCallback } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams } from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import ActionsCellRenderer from './ActionsCellRenderer'
import { selectCafes, setCafesAction, deleteCafeAction } from '../store/cafeSlice'

const Cafes = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const location = searchParams.get('location')

  const gridRef = React.createRef<AgGridReact>();

  const cafes = useSelector(selectCafes)

  const deleteCafe = useCallback(async (id: string) => {
  let toDelete = window.confirm('Are you sure you want to delete this cafe?')
  if (toDelete) {
    try {
      await axios.delete(`http://localhost:3001/cafes/${id}`)
      dispatch(deleteCafeAction(id))
      window.alert(`Cafe deleted successfully`)
    } catch (err) {
      console.error(err)
    }
  }
  }, [dispatch])

  const columnDefs: ColDef[] = useMemo(() => {
    return [
      { field: 'name', resizable: true },
      { field: 'description', resizable: true },
      {
        field: 'employees',
        resizable: true,
        cellRenderer: (params: ICellRendererParams) => {
          return <Button component='a' href={`/employees?cafe=${params.data._id}`}>{params.data.employees} employees</Button>
        }
      },
      { field: 'location', filter: true, resizable: true },
      {
        field: 'actions',
        cellRenderer: (params: ICellRendererParams) => {
          return (
            <ActionsCellRenderer
              editLink={`/cafes/${params.data._id}`}
              onClickDelete={async () => { await deleteCafe(params.data._id) }}
            />
          )
        }
      }
    ]
  }, [deleteCafe])

  const defaultColDef = useMemo(()=> ({
    sortable: false
  }), []);

  useEffect(() => {
    axios.get(`http://localhost:3001/cafes${location ? `?location=${location}` : ''}`)
      .then(res => {
        dispatch(setCafesAction(res.data))
      })
      .catch(err => console.error(err))
  }, [dispatch, location])

  return (
    <Box>
      <Typography variant="h4">Cafes</Typography>

      <Button variant="contained" sx={{ my: 2 }} component='a' href="/cafes/new">Add new cafe</Button>

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
