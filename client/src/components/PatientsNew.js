import { Link, useHistory } from "react-router-dom"
import axios from 'axios'
import {useState, useEffect} from 'react'
import {Form, Button} from 'semantic-ui-react'

const PatientsNew = ({getPatients, setShowForm}) => {
  const [name, setName] = useState('')
  let history = useHistory()
  

  
  const handleSubmit = async () => {
    try{
      axios.post(`/api/patients`,{name})
      history.push('/patients')
      getPatients()
      console.log(getPatients())
      setShowForm(false)
    }catch(err){
      alert('Errorrrrrrr')
    }
  }

  useEffect(()=>{
    getPatients()
  }, [])
  
  return (
    <>
    <div>
      <h1>New Patient Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder='Name'
          />
        </Form.Field>
        <Button color='green' type='submit'>Submit</Button>
      </Form>
    </div>
    </>
  )
}

export default PatientsNew

