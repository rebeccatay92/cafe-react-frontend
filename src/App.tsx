import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './pages/Root'
import Cafes from './pages/Cafes'
import AddEditCafe from './pages/AddEditCafe'
import Employees from './pages/Employees'

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
        element: (<div>edit employee</div>)
      },
      {
        path: '/employees/new',
        element: (<div>add employee</div>)
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
