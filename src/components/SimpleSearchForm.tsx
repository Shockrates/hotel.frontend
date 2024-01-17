import {useGetAllRooms} from "../lib/apiCalls"
import { DateInfo, Room } from "../types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import apiClient from "../lib/apiClient";
import { addDays } from "flowbite-react/lib/esm/components/Datepicker/helpers";

const SimpleSearchForm = () => {


    const { rooms } = useGetAllRooms();
    const navigate = useNavigate();
    const {types, cities} = getTypesAndCities(rooms)

    const [formData, setFormData] = useState({
        city: "",
        roomType: "",
        check_in_date: "",
        check_out_date: "",
      });
      
    const handleInputChange = (e:any, dateInfo?:DateInfo) => {
        const { name, value } = (typeof dateInfo !== 'undefined') ? dateInfo : e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));   
    };

    
    const handleSubmit = async (e: any) =>{
        e.preventDefault();
        //console.log(formData);
        try {
            const resp =  await apiClient.post('/api/roomsearch', formData);
            if (resp?.status === 200) {
              console.log(resp.data.data);
            }
        } catch (error) {
            console.log(error);    
        }
    }

    return (
        <>
         
            <form className='bg-[#fff] space-y-4 md:space-y-6 p-6 rounded-xl w-full shadow-lg ' onSubmit={handleSubmit}>
                <div className='flex items-center justify-between flex-col sm:flex-row'>
                    <div className="sm:w-1/2 w-full my-0 mx-1">

                        <select className='w-full' id="city" name="city" required defaultValue={""} onChange={handleInputChange}>
                            <option value="" disabled hidden>City</option>
                            {(cities.length == 0)
                                ?<option value="" >{"No cities available"}</option>
                                :cities.map((city, index) => <option key={index} value={city} >{city}</option>)
                            }
                        </select>
                    </div>
                    <div className="sm:w-1/2 w-full my-0 mx-1">

                        <select className='w-full' id="roomType" name="roomType" defaultValue={""}>
                            <option value="">Room Type</option>
                            {
                                (types.length == 0)
                                ?<option value="" >{"No Room types available"}</option>
                                :types.map((type, index) => <option key={index} value={type} >{type}</option>)
                            }
                        </select>
                    </div>
                </div>

                <fieldset className='flex items-center justify-between flex-col sm:flex-row'>
                    <div className="sm:w-1/2 w-full my-0 mx-1">
                        <DatePicker 
                            className="w-full text-black"
                            
                            placeholderText="Chose Check-In Date"
                            selected={formData.check_in_date ? new Date(formData.check_in_date) : null}
                            onChange={(date:Date , e:any) => handleInputChange(e, {name:"check_in_date", value: date.toISOString()})}
                            dateFormat={"dd/MM/yyyy"}
                            minDate={new Date()}
                        /> 
                    </div>
                    <div className="sm:w-1/2 w-full my-0 mx-1">
                    <DatePicker 
                            className="w-full text-black"
                            selected={formData.check_out_date ? new Date(formData.check_out_date) : null}
                            placeholderText="Chose Check-Out Date"
                            onChange={(date:Date , e:any) => handleInputChange(e, {name:"check_out_date", value: date.toISOString()})}
                            dateFormat={"dd/MM/yyyy"}
                            minDate={addDays(new Date(formData.check_in_date), 1)}
                        /> 
                  

                    </div>
                    
                </fieldset>

                <div className="my-2 mx-0 text-center">
                {/* <Link to={"/rooms"}> */}
                <button
                        className="p-4 text-sm font-sans rounded-lg bg-[#fa4903] text-white cursor-pointer hover:bg-[#b63400] px-6 transition duration-300"
                        type="submit"
                    >
                    Search
                </button>    
                {/* </Link> */}
                    

                </div>


            </form>
        </>
    )
}

export default SimpleSearchForm

const getTypesAndCities = (rooms: Room[]) => {

    const types = [...new Set(rooms.map(room => room.attributes.type))];
    const cities = [...new Set(rooms.map(room => room.attributes.city))];

    return {
        types,
        cities 
    }
}