import { InputComponent } from './InputComponent'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { GrMail } from 'react-icons/gr'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Form = () => {

    const methods = useForm()
    

    const onSubmit = methods.handleSubmit(data => {
        console.log(data.ReactDatepicker.toISOString())
      })

    return (
<>
        <FormProvider {...methods}>
            <form
                className='container bg-[#fff] space-y-4 md:space-y-6 p-6 rounded-xl w-full shadow-lg '
                onSubmit={e => e.preventDefault()}
                noValidate

            >
                <div className="container mt-5 text-center bg-white">
                    <div className="grid gap-5 md:grid-cols-2">
                    <InputComponent
                        label="name"
                        type="text"
                        id="name"
                        placeholder="type your name..."
                    />
                    <InputComponent
                        label="password"
                        type="password"
                        id="password"
                        placeholder="type your password..."
                    />
                    <Controller
                        control={methods.control}
                        name="ReactDatepicker"
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <DatePicker 
                            className="w-full text-black"
                            selected={value}
                            placeholderText="Chose Check-Out Date"
                            onChange={onChange}
                            onBlur={onBlur}
                            dateFormat={"dd/MM/yyyy"}
                        /> 
                        )}
                    />
                        </div>
                    </div>
                <div className="mt-5">
                    <button
                        onClick={onSubmit}
                        className="flex items-center gap-1 p-5 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800"
                    >
                        <GrMail />
                        Submit Form
                    </button>
                </div>
            </form>
        </FormProvider>
        </>  
    )
 }
