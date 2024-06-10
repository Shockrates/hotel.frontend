import { useEffect, useState } from "react";
import apiClient from "./apiClient";
import { Review, Room, RoomType} from "../types";


export const getAllRooms = async () => {

  let rooms:Room[] = []

  try {
    await apiClient.get('/api/rooms')
    .then(response => {
        rooms = response.data.data ;   
    })
    .catch(error => console.error(error));
  } catch (error) {
    console.log(error);
  } 

  return rooms
}

export const getRoom = async (id:string) => {

  //let room:Room = null

  try {
    let room:Room = await apiClient.get(`/api/rooms/${id}`)
      .then(response => {
          return response.data.data ;   
      })
      .catch(error => console.error(error));
      return room
  } catch (error) {
    console.log(error);
  } 

  
}


export const getAllRoomTypes = async () => {

  let roomTypes:RoomType[] = []

  try {
    await apiClient.get('/api/roomtype')
    .then(response => {
        roomTypes = response.data.data ;   
    })
    .catch(error => console.error(error));
  } catch (error) {
    console.log(error);
  }  
  return roomTypes
}


export const useGetAllRooms = () =>{

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        await apiClient.get('/api/rooms')
        .then(response => {
            setRooms(response.data.data) ;   
        })
        .catch(error => console.error(error));
      } catch (error) {
        console.log(error);
      } 
    }
    getAllRooms();
  }, [])

  return {
    rooms
  }
  
}

export const useSearchResultRooms = (formData:Record<string, any>) =>{

  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, seterror] = useState();

  useEffect(() => {
    const getAllRooms = async (query:Record<string, any>) => {
      
      try {
        await apiClient.post('/api/roomsearch', query)
        .then(response => {
            setRooms(response.data.data) ;   
        })
        .catch(error => seterror(error.response.data.message));
      } catch (error) {
        console.log(error);
      } 
    }
    getAllRooms(formData);
  }, [])

  return {
    rooms, error
  }
  
}

// Logout the user
export const handleLogout = async () => {
  try {
    
    await apiClient.post('/api/logout')
      .then(response => {
          localStorage.removeItem('user');
          window.location.href = '/';
    })
    .catch(err => console.log(err.response.data.message));
    // if (resp.status === 200) {
    //   localStorage.removeItem('user');
    //   window.location.href = '/';
    // }
  } catch (error) {
    console.log(error);
  }
};

export const searchRooms = async (formData:Record<string, any>) =>{

  // const [rooms, setRooms] = useState<Room[]>([]);
  // const [error, seterror] = useState();
  let rooms:Room[] = [];
  let error;


  try {
    await apiClient.post('/api/roomsearch', formData)
    .then(response => {
        rooms = response.data.data ;      
    })
    .catch(err => error = err.response.data.message);
  } catch (error) {
    console.log(error);
  } 
    
  return {
    rooms, error
  }
}

export const getRoomReviews = async (id:string) => {

  //let room:Room = null

  try {
    let review:Review = await apiClient.get(`/api/rooms/${id}/reviews`)
      .then(response => {
          return response.data.data ;   
      })
      .catch(error => console.error(error));
      return review
  } catch (error) {
    console.log(error);
  } 

  
}

export const isBooked = async (id:string, formData:Record<string, any>) =>{


  let isFree:Boolean
  let error;


  try {
    await apiClient.post(`/api/room/${id}/booked`, formData)
    .then(response => {
      console.log(response.data["is free?"]);
      
        //rooms = response.data.data ;      
    })
    .catch(err => error = err.response.data.message);
  } catch (error) {
    console.log(error);
  } 
    
  return {
     error
  }
}
