import { useState } from "react";
import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";
import apiClient from "../lib/apiClient";
import { AxiosError } from "axios";


function Register() {

  //const navigate = useNavigate();
  const { setUserToLocalStorage }= useAuth();
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // register user
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const {name, email, password, cpassword } = e.target.elements;
    const body = {
			name: name.value,
			email: email.value,
			password: password.value,
			password_confirmation: cpassword.value,
		};

    try {
      const resp =  await apiClient.post('/api/register', body);
	  
      if (resp?.status === 200) {
        setUserToLocalStorage(resp.data.data.user)
		//Navigate("/profile");
        return <Navigate to="/" />;
      }
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.status === 422) {
        console.log(error.response.data.errors);
        if (error.response.data.errors.name) {
          setNameError(error.response.data.errors.name[0]);
        } else {
          setNameError('');
        }
        if (error.response.data.errors.email) {
          setEmailError(error.response.data.errors.email[0]);
        } else {
          setEmailError('');
        }
        if (error.response.data.errors.password) {
          setPasswordError(error.response.data.errors.password[0]);
        } else {
          setPasswordError('');
        }
      }
    }
  };

  return (
   
        <div className='mx-auto sm:w-[416px] transform duration-300 ease-in animate-slideIn'>
        <form 
              className="bg-[#fff] space-y-6 p-6 rounded-xl w-full shadow-lg"
							action="#"
							method="post"
							onSubmit={handleSubmit}
            >
              <div className="">
              <label
									htmlFor="name"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Full Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Your name"
									required
								/>
                {nameError && (
                  <p className="text-sm text-red-600">{nameError}</p>
                )}
              </div>
              <div className="">
              
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@provider.com"
									required
								/>
								{emailError && (
									<p className="text-sm text-red-600">{emailError}</p>
								)}
              </div>
              <div className="">
              <label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
								{passwordError && (
									<p className="text-sm text-red-600">{passwordError}</p>
								)}
              </div>
              <div className="">
              <label
									htmlFor="cpassword"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Confirm password
								</label>
								<input
									type="password"
									name="cpassword"
									id="cpassword"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
              </div>
              <button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
								Create an account
							</button>
              <p className="text-sm font-light text-gray-500 dark:text-primary-400">
                Already have an account?{' '}
								<Link
									to="/"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500">
									Login here
								</Link>
              </p>

            </form>
        </div>
  
  )
}

export default Register


