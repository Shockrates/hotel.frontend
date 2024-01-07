import { useEffect, useState } from "react";
import { Room } from "../types";
import apiClient from "../lib/apiClient";
import SimpleSearchForm from "../components/SimpleSearchForm";



function Home() {

  return (
    <div className='flex flex-row h-1/2 place-items-center'>
        <div className='mx-auto transform animate-slideIn'>
          <SimpleSearchForm />
        </div> 
        
    </div>
  )
}

export default Home
