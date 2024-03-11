import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Home, { homeLoader } from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Rooms, { roomLoader } from "./pages/Rooms";
import { searchRoomAction } from "./components/Form";

const router = createBrowserRouter([
    {
        path:'/',
        element:<HomeLayout />,
        children:[
            {
                path:'/',
                element:<Home />,
                loader: homeLoader,
                action: searchRoomAction
            },
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: '/login',
                        element: <Login />
                    },
                    {
                        path: '/register',
                        element: <Register />
                    },
                ]
            },
           
        ]
    },
    {
        path: '/',
        element: <MainLayout />,
        children:[ 
            {
                path: '/rooms',
                element: <Rooms />,
                loader: roomLoader,
              
            },
            // {
            //     path: '/room/:id',
            //     element: <Room />
            // },   
			// {
			// 	path: '/profile',
			// 	element: <Profile />,
			// },
        ]
    }
])

export default router;