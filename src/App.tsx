import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './pages/Root'
import Cafes from './pages/Cafes'
import AddEditCafe from './pages/AddEditCafe/AddEditCafe'
import Employees from './pages/Employees'
import AddEditEmployee from './pages/AddEditEmployee/AddEditEmployee'
import { CAFE_FORM_TYPE } from './pages/AddEditCafe/formConstants'
import { EMPLOYEE_FORM_TYPE } from './pages/AddEditEmployee/formConstants'

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
        element: (<AddEditCafe type={CAFE_FORM_TYPE.EDIT} />)
      },
      {
        path: '/cafes/new',
        element: (<AddEditCafe type={CAFE_FORM_TYPE.ADD} />)
      },
      {
        path: '/employees',
        element: (<Employees />)
      },
      {
        path: '/employees/:id',
        element: (<AddEditEmployee type={EMPLOYEE_FORM_TYPE.EDIT} />)
      },
      {
        path: '/employees/new',
        element: (<AddEditEmployee type={EMPLOYEE_FORM_TYPE.ADD} />)
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
