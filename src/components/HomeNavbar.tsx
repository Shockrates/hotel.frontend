import { FaHome, FaUserPlus } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext";
import { handleLogout } from "../lib/apiCalls";

function HomeNavbar() {

    const { user } = useAuth();

    // State to manage the navbar's visibility
    const [nav, setNav] = useState(false);

    // Toggle function to handle the navbar's display
    const handleNav = () => {
        setNav(!nav);
    };

    // Array containing navigation items
    const navItems = [
        { id: 1, text: 'Home', link: "/", icon: FaHome },
        { id: 2, text: 'Register', link: "/register", icon: FaUserPlus },
        { id: 3, text: 'Login', link: "/login", icon: MdOutlineLogin },

    ];

    const authNavItems = [
        { id: 1, text: 'Home', link: "/", icon: FaHome },
        { id: 2, text: 'Profile', link: "/profile", icon: FaUserPlus },


    ];

    return (
        <>
            <nav className="bg-black border-gray-200 px-2 sm:px-4 py-3 text-white dark:bg-gray-900">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    {/* Logo */}
                    <h1 className='p-4  m-1 text-2xl font-bold'>HOTELS.</h1>
                    {/* Desktop Navigation */}
                    <ul className='hidden sm:flex'>
                        {(user === null)
                            ? navItems.map(item => (
                                <li
                                    key={item.id}
                                    className='first:mr-2 first:border-r-2'
                                >
                                    <NavLink
                                        to={item.link}
                                        className='flex items-center hover:bg-primary-500 rounded-xl p-4  m-1 cursor-pointer duration-300 hover:text-black'
                                    >
                                        <item.icon size={20} />
                                        <span className="ml-1 text-lg">
                                            {item.text}
                                        </span>

                                    </NavLink>

                                </li>
                            ))
                            : authNavItems.map(item => (
                                <li
                                    key={item.id}
                                    className='first:mr-2 first:border-r-2'
                                >
                                    <NavLink
                                        to={item.link}

                                        className='flex items-center hover:bg-primary-500 rounded-xl p-4  m-1 cursor-pointer duration-300 hover:text-black'
                                    >
                                        <item.icon size={20} />
                                        <span className="ml-1 text-lg">
                                            {item.text}
                                        </span>

                                    </NavLink>

                                </li>
                            ))
                        }
                        {(user) &&  
                            <li className='first:mr-2 first:border-r-2'>
                            <a
                                onClick={handleLogout}
                                href="#"
                                className="flex items-center hover:bg-primary-500 rounded-xl p-4  m-1 cursor-pointer duration-300 hover:text-black">
                                <span className="ml-1 text-lg">
                                    Logout
                                </span>
                            </a>
                        </li>
                        }
                    </ul>

                    {/* Mobile Navigation Icon */}
                    <div onClick={handleNav} className='block sm:hidden'>
                        {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <ul
                    className={
                        nav
                            ? 'fixed sm:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-10'
                            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%] '
                    }
                >
                    {/* Mobile Logo */}
                    <h1 className='w-full text-2xl font-bold m-4'>HOTELS.</h1>

                    {/* Mobile Navigation Items */}
                    {navItems.map(item => (
                        <li
                            key={item.id}
                            className='p-4 border-b rounded-xl hover:bg-primary-500 duration-300 hover:text-black cursor-pointer border-gray-600'
                        >
                            {item.text}
                        </li>
                    ))}
                </ul>

            </nav>

        </>
    )
}

export default HomeNavbar