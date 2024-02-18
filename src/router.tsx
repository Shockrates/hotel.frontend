import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Home, { homeLoader } from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Rooms from "./pages/Rooms";

const router = createBrowserRouter([
    {
        path:'/',
        element:<HomeLayout />,
        children:[
            {
                path:'/',
                element:<Home />,
                loader: homeLoader,
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