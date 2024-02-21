import { FormProvider, useForm } from 'react-hook-form'
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerInput } from './DatePickerInput';
import { SimpleFormValues } from '../types';
import { addDays } from 'flowbite-react/lib/esm/components/Datepicker/helpers';
import { SelectComponent } from './SelectComponent';
import { useNavigate} from 'react-router-dom';

export const Form = ({cities, roomTypes}: any) => {

   
    const navigate = useNavigate();

    const methods = useForm<SimpleFormValues>()

    const checkInValue = methods.watch('check_in_date');
    const checkOutValue = methods.watch('check_out_date');

    const onSubmit = methods.handleSubmit(async (formData) => {

        const quesryString = Object.entries(formData).map(([key, value]) => {
            if ( value) {
                return `${key}=${(value instanceof Date)? value.toLocaleDateString() : value.toString()}` 
            } 
        })
        .join('&');
        //console.log(formData);

        navigate(`/rooms?${quesryString}`);
     
    })


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

                            {/* <InputComponent
                                name="name"
                                type="text"
                                id="name"
                                placeholder="Type your name..."
                                rules = {
                                    { required: 'Name is Required' }
                                }
                            /> */}
                            
                            <SelectComponent
                                name="city"
                                id="city"
                                placeholder="City"
                                values={cities}
                                rules = {
                                    { required: 'City is Required' }
                                }
                            />
                            <SelectComponent
                                 name="type_id"
                                 id="roomType"
                                 placeholder="Room Type"
                                 values={roomTypes}
                            />
                            <DatePickerInput
                                name="check_in_date"
                                id="check_in_date"
                                placeholder="Choose Check-In Date"
                                rules = {
                                    { required: 'Please enter check in date' }
                                }
                                minDate={addDays(new Date(), +1)}
                                maxDate={addDays(new Date(checkOutValue), -1)}
                            />
                            
                            <DatePickerInput
                                name="check_out_date"
                                id="check_out_date"
                                rules = {
                                    { required: 'Please enter check out date' }
                                }
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
