import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Router } from './routes/router'
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; 
import "primeflex/primeflex.css"

function App() {
  
  return (
    <>
      <RouterProvider router={Router}/>
    </>
  )
}

export default App
