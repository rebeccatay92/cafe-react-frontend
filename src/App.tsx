import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './pages/Root'
import Cafes from './pages/Cafes'
import AddEditCafe from './pages/AddEditCafe'
import Employees from './pages/Employees'
import AddEditEmployee from './pages/AddEditEmployee'

const router = createBrowserRouter([
  {
    path: '/',
    element: (<Root />),
    children: [
      {
        path: '/cafes',
        element: (<Cafes />)
      },
      {
        path: '/cafes/:id',
        element: (<AddEditCafe type="edit" />)
      },
      {
        path: '/cafes/new',
        element: (<AddEditCafe type="add" />)
      },
      {
        path: '/employees',
        element: (<Employees />)
      },
      {
        path: '/employees/:id',
        element: (<AddEditEmployee type="edit" />)
      },
      {
        path: '/employees/new',
        element: (<AddEditEmployee type="add" />)
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
