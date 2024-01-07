import {Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';



export default function HomeLayout() {

  return (
    <>
     
      <div className="bg-home bg-cover bg-center h-screen">
        <Navbar />
        <Outlet />
      </div>
 
    </>
  )
}