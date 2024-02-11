import { useFormContext } from "react-hook-form"
import { inputProps } from "../types"


export const InputComponent = ({name, type, id, placeholder, rules}: inputProps) => {

  
    const { register, formState: { errors } } = useFormContext()

    return (
        <div className="flex flex-col w-full gap-2">
          <input
            id={id}
            type={type}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeholder}
            autoComplete='off'
            {...register(name, rules)}
          />
           {errors[name] && <p className="text-rose-500">{(errors[name] as any).message}</p>}
        </div>
    )
}

const InputError = () => {
    return <div>error</div>
}

const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
}