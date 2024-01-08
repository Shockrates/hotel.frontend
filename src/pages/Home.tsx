import { useEffect, useState } from "react";
import { Room } from "../types";
import apiClient from "../lib/apiClient";
import SimpleSearchForm from "../components/SimpleSearchForm";



function Home() {

  return (

    <div className='mx-auto transform animate-slideIn'>
      <SimpleSearchForm />
    </div>   
    
  )
}

export default Home
