import {useGetAllRooms} from "../lib/apiCalls"
import { Room } from "../types";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SimpleSearchForm = () => {

    const { rooms } = useGetAllRooms();
    const navigate = useNavigate();
    const {types, cities} = getTypesAndCities(rooms)

    const [checkInDate, setCheckInDate] = useState<Date>();
    console.log(checkInDate);
    
    const handleSubmit = (e: any) =>{
        e.preventDefault();
        navigate('/rooms');
    }

    return (
        <>
         
            <form className='bg-[#fff] space-y-4 md:space-y-6 p-6 rounded-xl w-full shadow-lg ' onSubmit={handleSubmit}>
                <div className='flex items-center justify-between flex-col sm:flex-row'>
                    <div className="sm:w-1/2 w-full my-0 mx-1">

                        <select className='w-full' id="city" name="city" required defaultValue={""}>
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

                        <input className='w-full' type="text" id="check_in_date" name="check_in_date" value={checkInDate?.toLocaleString('en-CA')} required />
                        <DatePicker 
                            className="w-full text-black"
                           
                            placeholderText="Choose date range" 
                            selected={checkInDate} 
                            onChange={(date:Date) => setCheckInDate(date)} 
                            //dateFormat={"dd/MM/yyyy"}
                        /> 
                    </div>
                    <div className="sm:w-1/2 w-full my-0 mx-1">
                        <input className='w-full' type="date" id="check_out_date" name="check_out_date" placeholder="Check-Out Date" required />
                       
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