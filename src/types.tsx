

export type User = {
    id: string,
    name: string,
    email: string,
    created_at: Date,
    updated_at: Date,
    relationships: {
        reviews: Review[] | [],
        bookings: Booking[] | [],
        favorites: Favorite[],
    }

}

export type RoomType = {
    id:number,
    title:string
}

export type Room = {
    id : string,
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
        description_long: string,
        parking: boolean,
        wifi: boolean,
        pet_friendly: boolean,
        avg_reviews:number,
        count_reviews: number,
        created_at: Date,
        updated_at: Date
    },
    relationships: {
        roomType: RoomType
        reviews: Review[] | [],
        favorite_total: number,
        bookings: Booking[] | [],
 
    }
   

}

export type Review = {
    review_id: string,
    attributes: {
        user_id:string,
        room_id:string,
        rate: number,
        comment:string,
        created_at:Date
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

export type Favorite = {
    room_id: string,
    name:string
}

export type DateInfo = {
    name: string
    value: string
}

export type FormProps = {
    cities: option[]
    roomTypes: option[],
    min: number,
    max: number,
  }

export type SimpleFormValues = {
    city: string
    roomType: string
    check_in_date: Date
    check_out_date: Date
    minPrice:number,
    maxPrice:number
}


export type inputProps = {
    name: string,
    type: string,
    id: string,
    placeholder: string
    rules?: object
}

export type datePickerProps = {
    name: string,
    id: string,
    placeholder: string,
    defaultValue:string | null,
    rules?: object
    minDate?: Date,
    maxDate?: Date
}

export type SelectProps = {
    name: string,
    id: string,
    placeholder: string,
    defaultValue: string | null,
    values:option[],
    rules?: object
}

export type option = {
    label: string,
    value: string
}

export interface IUserState {
    user:User | null,
    setUserToLocalStorage:(_user: User) => void,
    csrfToken: () => void;
}

