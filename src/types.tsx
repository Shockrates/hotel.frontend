import {
    Control
} from 'react-hook-form'

export type User = {
    id: string,
    name: string,
    email: string,
    created_at: Date,
    updated_at: Date,
    relationships: {
        reviews: Review[] | [],
        bookings: Booking[] | [],
    }

}

export type Room = {
    id? : string,
    attributes: {
        name:string,
        type: string,
        city : string,
        area: string,
        photo_url:string,
        count_of_guests: number,
        price: number,
        address: string,
        location_lat: number,
        location_long: number,
        description_short: string,
        description_long: Text,
        parking: boolean,
        wifi: boolean,
        pet_friendly: boolean,
        created_at: Date,
        updated_at: Date
    },
    relationships: {
        reviews: Review[] | [],
        favorite_total: number
 
    }
   

}

export type Review = {
    review_id: string,
    attributes: {
        user_id:string,
        room_id:string,
        rate: number,
        comment:Text,
    }
}

export type Booking = {
    booking_id: string,
    attributes: {
        user_id:string,
        room_id:string,
        check_in_date: Date,
        check_out_date: Date,
        total_price: number
    }
}

export type DateInfo = {
    name: string
    value: string
}

export type inputProps = {
    label: string,
    type: string,
    id: string,
    placeholder: string
}

export type datePickerProps = {
    label: string,
    id: string,
    placeholder: string,
    control: Control
}

