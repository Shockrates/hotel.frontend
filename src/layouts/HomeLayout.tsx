import {Outlet } from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar';



export default function HomeLayout() {

  return (
    <>
     
      <div className="bg-home bg-cover bg-center h-full min-h-screen">
        <HomeNavbar />
        <div className='flex flex-row pt-20'>
          <Outlet />
        </div>
        
      </div>
 
    </>
  )
}