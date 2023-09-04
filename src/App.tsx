import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './pages/Root'

const router = createBrowserRouter([
  {
    path: '/',
    element: (<Root />),
  },
  {
    path: '/cafes',
    element: (<div>cafes</div>)
  },
  {
    path: '/cafes/:id',
    element: (<div>edit cafe</div>)
  },
  {
    path: '/cafes/new',
    element: (<div>add cafe</div>)
  },
  {
    path: '/employees',
    element: (<div>employees</div>)
  },
  {
    path: '/employees/:id',
    element: (<div>edit employee</div>)
  },
  {
    path: '/employees/new',
    element: (<div>add employee</div>)
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
