import { Link } from "react-router-dom";
import {useGetAllRooms} from "../lib/apiCalls"
import { Room } from "../types";

// const SimpleSearchForm = (props: { types: string[],cities: string[] }) => {
const SimpleSearchForm = () => {

    const { rooms } = useGetAllRooms();
    const {types, cities} = getTypesAndCities(rooms)
    

    return (
        <>
            <form className='bg-[#fff] space-y-4 md:space-y-6 p-6 rounded-xl w-full shadow-lg '>
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

                        <input className='w-full' type="text" id="check_in_date" name="check_in_date" placeholder="Check-In Date" required />
                    </div>
                    <div className="sm:w-1/2 w-full my-0 mx-1">
                        <input className='w-full' type="text" id="check_out_date" name="check_out_date" placeholder="Check-Out Date" required />
                    </div>
                </fieldset>

                <div className="my-2 mx-0 text-center">
                <Link to={"/rooms"}>
                <input
                        className="p-4 text-sm font-sans rounded-lg bg-[#fa4903] text-white cursor-pointer hover:bg-[#b63400] px-6 transition duration-300"
                        name="search"
                        id="searchButton"
                        type="button"
                        value="Search"
                    />
                </Link>
                    

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