import { Room } from "../types";

export const getTypesAndCities = (rooms: Room[]) => {

    const roomTypes = [...new Set(rooms.map(room => room.attributes.type))];
    const cities = [...new Set(rooms.map(room => room.attributes.city))];

    return {
        roomTypes,
        cities 
    }
}