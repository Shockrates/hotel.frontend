import { useFormContext } from "react-hook-form";
import { SelectProps } from "../types";

export const SelectComponent = ({name, id, placeholder, values, rules}: SelectProps) => { 

    const { register, formState: { errors } } = useFormContext()
    const required = (rules?.hasOwnProperty('required'));

    return(
        <div className="flex flex-col w-full gap-2">
          
                    <select 
                        id={id}
                        className="w-full p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
                        defaultValue={""}
                        {...register(name, rules)} 
                    >
                  
                        <option value="" disabled={required} hidden={required} >{placeholder}</option>
                        { (values.length == 0)
                                ?<option value="" >{`No ${name} available`}</option>
                                : values.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))
                        }
                    </select>
                    {errors[name] && <p style={{ color: 'red' }}>{(errors[name] as any).message}</p>}
        </div>
    )
}