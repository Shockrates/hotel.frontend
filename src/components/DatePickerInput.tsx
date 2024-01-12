import { Controller, useFormContext, useForm } from "react-hook-form"
import { datePickerProps } from "../types"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const DatePickerInput = ({control, label, id, placeholder}: datePickerProps) => {

    const { register } = useFormContext()
    //const { handleSubmit, control } = useForm();

    return (
        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-between">
            <label htmlFor={id} className="font-semibold capitalize">
              {label}
            </label>
          </div>
      
              <Controller
                        control={control}
                        name = {label}
                        rules={{ required: true }}
                      
                        render={({ field: { onChange, onBlur, value,  ref } }) => (
                            <DatePicker 
                                id={id}
                                className="w-full p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
                                selected={value}
                                placeholderText={placeholder}
                                onChange={onChange}
                                onBlur={onBlur}
                                dateFormat={"dd/MM/yyyy"}
                                
                            /> 
                        )}
                    />
          
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