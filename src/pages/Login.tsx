import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import apiClient from '../lib/apiClient';
import { AxiosError } from 'axios';

function Login() {

    const { setUserToLocalStorage, csrfToken } = useAuth();
    const [error, setError] = useState(null);

    const handleLogin = async (e: any) =>{

        e.preventDefault();
        const {email, password} = e.target.elements;
        const body = {
                email: email.value,
                password: password.value,
            };
        await csrfToken();
        try {
             
            const resp = await apiClient.post('/api/login', body);
            
            if (resp.status === 200) {
                setUserToLocalStorage(resp.data.data.user);
                console.log(resp);
                
            }
          } catch (error) {
            if (error instanceof AxiosError && error?.response?.status === 401) {  
                console.log(error.response.data.message);
                setError(error.response.data.message);
            }
          }

    }

    return (
        <div className='flex flex-row h-1/2 place-items-center'>
            <div className='mx-auto sm:w-[416px] transform duration-300 ease-in animate-slideIn'>

            {error && (
							<div
								className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
								role="alert">
								<span className="sr-only">Info</span>
								<div>{error}</div>
							</div>
                )}

                <form
                    action="#"
                    className='bg-[#fff] space-y-6 p-6 rounded-xl w-full shadow-lg'
                    method='post'
                    onSubmit={handleLogin}
                >
                    <div className='flex items-center'>
                        <label
                            htmlFor="email"
                            className="block w-1/2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@company.com"
                            required
                        />
                    </div>
                    <div className='flex items-center'>
                        <label
                            htmlFor="password"
                            className="block w-1/2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            autoComplete='off'
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        Sign In
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don't have an account yet? {' '}
                        <Link
                            to="/register"
                            className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>

        </div>
    )
}

export default Login