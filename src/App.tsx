import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { useEffect } from 'react'
import apiClient from './lib/apiClient'


function App() {
  //useLogToken();
  
  return (
    <div className="App">
      <RouterProvider router = {router} />
    </div>
  )
}

export default App

const useLogToken = () => {
  
  useEffect(() => {
    (async () => {
      const csrf = await apiClient.get('/sanctum/csrf-cookie');
      console.log('csrf = ', csrf);
      
    })()
  }, []);

}





