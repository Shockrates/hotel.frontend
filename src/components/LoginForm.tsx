import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../lib/apiClient';
import { AxiosError } from 'axios';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { InputComponent } from './InputComponent';

type LoginFormTypes = {
    email: string
    password: string
}

function LoginForm() {

    const methods = useForm<LoginFormTypes>()

    const { setUserToLocalStorage, csrfToken } = useAuth();
    const [error, setError] = useState(null);

    const onSubmit = methods.handleSubmit(async data => {
        const { email, password } = data;
        const body = {
            email: email,
            password: password,
        };
  
        await csrfToken();
        try {
            const resp = await apiClient.post('/api/login', body);
            if (resp.status === 200) {
                setUserToLocalStorage(resp.data.data.user);
            }
        } catch (error) {
            if (error instanceof AxiosError && error?.response?.status === 401) {
                console.log(error.response.data.message);
                setError(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    })


    return (
        <div className='mx-auto sm:w-[416px] transform duration-300 ease-in animate-slideIn'>

            {error && (
                <div
                    className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                    role="alert">
                    <span className="sr-only">Info</span>
                    <div>{error}</div>
                </div>
            )}
            <FormProvider {...methods}>
                <form
                    
                    className='bg-[#fff] space-y-6 p-6 rounded-xl w-full shadow-lg'
                    onSubmit={e => e.preventDefault()}
                
                >
                    <div className='flex items-center'>
                        <InputComponent
                            name="email"
                            type="email"
                            id="email"
                            placeholder="name@company.com"
                            rules = {{
                                required: 'Email is Required' ,
                               
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email format',
                                },
                            }}
                        />
                    </div>
                    <div className='flex items-center'>
                        <InputComponent
                            name="password"
                            type="password"
                            id="password"
                            placeholder="•••••••"
                            rules = {
                                { required: 'Password is Required' }
                            }
                        />
                    </div>
                    <button
                        onClick={onSubmit}
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

            </FormProvider>

        </div>
    )
}

export default LoginForm



