import { FormProvider, useForm } from 'react-hook-form'
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerInput } from './DatePickerInput';
import { SimpleFormValues } from '../types';
import { addDays } from 'flowbite-react/lib/esm/components/Datepicker/helpers';
import {SelectInput } from './SelectInput';
import { ActionFunctionArgs, useActionData, useNavigate, useSearchParams} from 'react-router-dom';
import { formDataToQuery } from '../lib/utils';

export const searchRoomAction = async ({ request }: ActionFunctionArgs) =>{
    // Get the form data from the request
    const formData = await request.formData();
    // Convert the form data to an object format
    const payload = Object.fromEntries(formData.entries());
    return payload
    
}


export const Form = ({cities, roomTypes, formStyle, children, action}: any) => {

    const [params, setParams] = useSearchParams();
    
    const navigate = useNavigate();

    const methods = useForm<SimpleFormValues>()

    const checkInValue = methods.watch('check_in_date');
    const checkOutValue = methods.watch('check_out_date');

    const onSubmit = methods.handleSubmit((formData) => {

        const quesryString = formDataToQuery(formData);
        //Testing
        Object.entries(formData).map(([key, value]) => {
            if ( value) {
                setParams(prev =>{
                    prev.set(key, (value instanceof Date)? value.toDateString() : value.toString())
                    return prev
                })
            } 
        })
        
        //console.log(params);

        navigate(`/rooms?${quesryString}`); 
    })


    return (
        <>
            <FormProvider {...methods}>
                <form
                    action={action}
                    className='container bg-[#fff] space-y-4 md:space-y-6 p-6 rounded-xl w-full shadow-lg '
                    onSubmit={e => e.preventDefault()}
                    noValidate

                >
                    <div className="mt-5 text-center bg-white">
                        <div className={formStyle}>
                            
                            <SelectInput
                                name="city"
                                id="city"
                                placeholder="City"
                                defaultValue={params.get('city')}
                                values={cities}
                                rules = {
                                    { required: 'City is Required' }
                                }
                            />
                            <SelectInput
                                 name="type_id"
                                 id="roomType"
                                 placeholder="Room Type"
                                 defaultValue={params.get('type_id')}
                                 values={roomTypes}
                            />
                            {children}
                            <DatePickerInput
                                name="check_in_date"
                                id="check_in_date"
                                placeholder="Choose Check-In Date"
                                defaultValue={params.get('check_in_date')}
                                rules = {
                                    { required: 'Please enter check in date' }
                                }
                                minDate={addDays(new Date(), +1)}
                                maxDate={addDays(new Date(checkOutValue), -1)}
                            />
                            
                            <DatePickerInput
                                name="check_out_date"
                                id="check_out_date"
                                defaultValue={params.get('check_out_date')}
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
