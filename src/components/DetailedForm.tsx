import { FormProvider, useForm } from "react-hook-form"
import { SimpleFormValues } from "../types"
import { SelectComponent } from "./SelectInput"
import { DatePickerInput } from "./DatePickerInput"
import { addDays } from 'flowbite-react/lib/esm/components/Datepicker/helpers';
 import { PriceSlider } from "./PriceSlider";



export const DetailedForm = ({cities, roomTypes}: any) => {

    const methods = useForm<SimpleFormValues>();

    const checkInValue = methods.watch('check_in_date');
    const checkOutValue = methods.watch('check_out_date');

    const onSubmit = methods.handleSubmit(async (formData) => {

        const quesryString = Object.entries(formData).map(([key, value]) => {
            if ( value) {
                return `${key}=${(value instanceof Date)? value.toDateString() : value.toString()}` 
            } 
        })
        .join('&');
        console.log(quesryString);
        //navigate(`/rooms?${quesryString}`);
     
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
                        <div className="flex flex-col gap-5">

            
                            
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
                            <PriceSlider 
                                initialMin={10} 
                                initialMax={400}
                                min={0}
                                max={500}
                                step={1}
                                priceCap={0}
                            />
                             {/* <RangeSliderComponent nameMin="minPrice" nameMax="maxPrice" min={0} max={100} step={5} value={value} onChange={setValue} /> */}
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