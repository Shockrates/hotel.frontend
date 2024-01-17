import SimpleSearchForm from "../components/SimpleSearchForm";
import { Form } from "../components/Form";



function Home() {

  return (

    <div className='mx-auto transform animate-slideIn'>
      <SimpleSearchForm />
      <div className="mt-10"></div>
      <Form />
    </div>   
    
  )
}

export default Home
