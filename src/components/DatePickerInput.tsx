import { Controller, useFormContext, useForm } from "react-hook-form"
import { datePickerProps } from "../types"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const DatePickerInput = ({name, id, placeholder,rules, minDate, maxDate}: datePickerProps) => {

    const {  register, control, formState:{errors}  } = useFormContext()
    //const { handleSubmit, control } = useForm();

    return (
        <div className="flex flex-col w-full gap-2">
      
              <Controller
                        control={control}
                        name = {name}
                        rules={rules}
                        render={({ field: { onChange, onBlur, value,  ref } }) => (
                            <DatePicker 
                                id={id}
                                className="w-full p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
                                selected={value}
                                placeholderText={placeholder}
                                onChange={onChange}
                                onBlur={onBlur}
                                dateFormat={"dd/MM/yyyy"}
                                autoComplete="off"
                                minDate={minDate}
                                maxDate={maxDate}
                                
                            /> 
                        )}
                    />
                    {errors[name] && <p style={{ color: 'red' }}>{(errors[name] as any).message}</p>}
          
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