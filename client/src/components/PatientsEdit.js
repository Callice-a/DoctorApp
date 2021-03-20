// import { Link } from "react-router-dom"

import React, {useState, useEffect} from 'react'
import {Button, Form} from 'semantic-ui-react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'



const PatientsEdit = (props) => {
  const {getPatients, setShowEditForm, setEditID, patientID, patient} = props
  const [nameInit, setName] = useState(patient.name)
  let history = useHistory()

  const handleSubmit = async(e, patientID)=>{
    e.preventDefault()
    try{
      let res = await axios.put(`/api/patients/${patientID}`, {name: nameInit})
      setName(res.data.name)
      history.push('/patients')
      getPatients()
      console.log(getPatients())
      setShowEditForm(false)
      setEditID(-1)
    } catch(err){
      alert(err)
    }    
  }

  useEffect(()=>{
    getPatients()
  }, [])

  return (
    <div>
      <h1> Edit Patient: {patient.name}</h1>
      <Form onSubmit={(e)=>handleSubmit(e, patient.id)}>
        <Form.Field>
          <label>Name</label>
          <input 
          value={nameInit}
          onChange={(e)=> setName(e.target.value)}
          defaultValue={nameInit}
          placeholder="Name"
          />
        </Form.Field>
        <Button color='blue' type='submit'>Update</Button>
      </Form>
      <br/>
    </div>
  )
}

export default PatientsEdit