import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthLayout from "./layouts/AuthLayout";

const router = createBrowserRouter([
    {
        path:'/',
        element:<HomeLayout />,
        children:[
            {
                path:'/',
                element:<Home />,
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
    // {
    //     path: '/',
    //     element: <MainLayout />,
    //     children:[ 
    //         {
    //             path: '/search',
    //             element: <Search />
    //         },
    //         {
    //             path: '/room/:id',
    //             element: <Room />
    //         },   
	// 		{
	// 			path: '/profile',
	// 			element: <Profile />,
	// 		},
    //     ]
    // }
])

export default router;