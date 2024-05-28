import { Outlet, useLoaderData } from "react-router-dom"
import MainNavbar from "../components/MainNavbar"
import { getAllRooms } from "../lib/apiCalls"
import { castToFormOptions } from "../lib/utils"
import { FormProps, option } from "../types"



export const mainLayoutLoader = async () => {
  
  
  const rooms = await getAllRooms();
  const {cities, roomTypes, min, max} = castToFormOptions(rooms);
 
  return {cities, roomTypes, min, max};

}

function MainLayout() {
  const {cities, roomTypes, min, max} = useLoaderData() as FormProps;
  return (
    <>
     
      <div className="h-full min-h-screen w-full m-1 lg:w-4/5 2xl:w-2/3 lg:m-auto sm:min-w-[540px]">
        <MainNavbar />
        <div className='flex flex-row pt-20 w-full'>
          <Outlet context={{cities:cities,roomTypes:roomTypes, min:min, max:max}}/>
        </div>
        
      </div>
 
    </>
  )
}

export default MainLayout