import { Outlet } from "react-router-dom"
import MainNavbar from "../components/MainNavbar"


function MainLayout() {
  return (
    <>
     
      <div className="h-full min-h-screen w-full m-1 lg:w-4/5 2xl:w-2/3 lg:m-auto sm:min-w-[540px]">
        <MainNavbar />
        <div className='flex flex-row pt-20 w-full'>
          <Outlet />
        </div>
        
      </div>
 
    </>
  )
}

export default MainLayout