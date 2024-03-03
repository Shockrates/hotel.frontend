import { Room, SimpleFormValues, option } from "../types";

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
    
    // const roomTypes: option[] = _types.map((element) => {
    //     return {label: element.title, value: element.id.toString()}
    // });

    // const cities: option[] = _cities.map((element) => {
    //     return {label: element, value: element}
    // });
    
    return {
        roomTypes,
        cities 
    }
}

export const formDataToQuery = (formData: SimpleFormValues) => {
    return Object.entries(formData).map(([key, value]) => {
        if ( value) {
            return `${key}=${(value instanceof Date)? value.toDateString() : value.toString()}` 
        } 
    })
    .join('&');
}