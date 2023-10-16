import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PetList from './Components/PetList.jsx'
import { PetsProvider } from './context/PetsContext.jsx'
import PetForm from './Components/PetForm.jsx'
import PetDetails from './Components/PetDetails.jsx'

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "pets/",
        element: <PetList />,
      },
      {
        path: "pets/form",
        element: <PetForm />,
      },
      {
        path: "/pets/details/:pet_id",
        element: <PetDetails />,
      },
      {
        path: "/form/:pet_id",
        element: <PetForm />,
      },
    ]
  },
]

const router = createBrowserRouter(routes)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PetsProvider>
      <RouterProvider router={router}>

      </RouterProvider>
    </PetsProvider>
  </React.StrictMode>,
)
