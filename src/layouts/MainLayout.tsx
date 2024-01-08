import { Outlet } from "react-router-dom"
import MainNavbar from "../components/MainNavbar"


function MainLayout() {
  return (
    <>
     
      <div className="h-full min-h-screen sm:w-2/3 min-w-[512px] m-auto">
        <MainNavbar />
        <div className='flex flex-row pt-20'>
          <Outlet />
        </div>
        
      </div>
 
    </>
  )
}

export default MainLayout