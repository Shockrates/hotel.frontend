import { useAuth } from "../contexts/AuthContext";
import { Booking, Room, SimpleFormValues, User, option } from "../types";

export const castToFormOptions = (rooms:Room[]) => {


   const roomTypes:option[]= [...new Set(rooms.map((room) => JSON.stringify(room.relationships.roomType)))]
   .map((s) =>JSON.parse(s))
   .map((element) => {
        return {label: element.title, value: element.id.toString()}
    });
  
    
    const cities:option[] = [...new Set(rooms.map(room => room.attributes.city))]
    .map((element) => {
        return {label: element, value: element}
    });

    const max:number = Math.max(...[...new Set(rooms.map(room => room.attributes.price))])
    const min:number = Math.min(...[...new Set(rooms.map(room => room.attributes.price))])
    
    // const roomTypes: option[] = _types.map((element) => {
    //     return {label: element.title, value: element.id.toString()}
    // });

    // const cities: option[] = _cities.map((element) => {
    //     return {label: element, value: element}
    // });
    
    return {
        roomTypes,
        cities,
        max,
        min 
    }
}

export const formDataToQuery = (formData: SimpleFormValues) => {
    return Object.entries(formData).map(([key, value]) => {
        if ( value) {
            return `${key}=${(value instanceof Date)? value.toLocaleDateString() : value.toString()}&` 
        } 
    })
    .join('');
}

export const isFavorite = (roomId:string):Boolean => {
    const { user } = useAuth();
    
    return false
}

