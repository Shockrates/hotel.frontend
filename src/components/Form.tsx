import { InputComponent } from './InputComponent'
import { FormProvider, useForm } from 'react-hook-form'
import { GrMail } from 'react-icons/gr'
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerInput } from './DatePickerInput';
import { SimpleFormValues } from '../types';
import { addDays } from 'flowbite-react/lib/esm/components/Datepicker/helpers';

export const Form = () => {

    const methods = useForm<SimpleFormValues>()

    const onSubmit = methods.handleSubmit(data => {
        console.log(data)
    })


    const checkInValue = methods.watch('check_in_date');
    return (
        <>
            <FormProvider {...methods}>
                <form
                    className='container bg-[#fff] space-y-4 md:space-y-6 p-6 rounded-xl w-full shadow-lg '
                    onSubmit={e => e.preventDefault()}
                    noValidate

                >
                    <div className="mt-5 text-center bg-white">
                        <div className="grid gap-5 md:grid-cols-2">
                            <InputComponent
                                label="name"
                                type="text"
                                id="name"
                                placeholder="type your name..."
                                rules = {{
                                    required: {
                                        value: true,
                                        message: 'required',
                                      }
                                }}
                            />
                            
                            <InputComponent
                                label="password"
                                type="password"
                                id="password"
                                placeholder="type your password..."
                                rules = {{
                                    required: {
                                        value: true,
                                        message: 'required',
                                      }
                                }}
                            />
                            <DatePickerInput
                                label="check_in_date"
                                id="check_in_date"
                                placeholder="Choose Check-In Date"
                                minDate={new Date()}
                            />
                            
                            <DatePickerInput
                                label="check_out_date"
                                id="check_out_date"
                                placeholder="Choose Check-out Date"
                                minDate={addDays(new Date(checkInValue), 1)}
                            />

                        </div>
                    </div>
                    <div className="my-2 mx-0 text-center">
                        <button
                            onClick={onSubmit}
                            className="p-4 text-sm font-sans rounded-lg bg-[#fa4903] text-white cursor-pointer hover:bg-[#b63400] px-6 transition duration-300"
                            >
                           
                            Search
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
