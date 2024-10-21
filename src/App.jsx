

import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'
import { ToastContainer } from 'react-toastify';
function App() {


  return (
    <>
      <div>
        <RouterProvider router={router}/>
        <ToastContainer 
        position="top-center" 
        />
      </div>
    </>
  )
}

export default App
