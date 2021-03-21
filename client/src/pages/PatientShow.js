import useAxiosOnMount from '../hooks/useAxiosOnMount'
import AxiosContainer from '../components/AxiosContainer'
import {useParams} from 'react-router'
import CardContainer from '../components/CardContainer'
import Card from '../components/Card'
import CardContainer from '../components/CardContainer'
import LoaderAndError from '../components/LoaderAndError'
import List from '../components/List'
import { useState } from 'react'
import axios from 'axios'
import Button from '../components/Button'
import { Button as SEMButton, Form, Select } from 'semantic-ui-react'

const PatientShow = (props)=>{
  const { id } = useParams()
  const { data, loading, error, getData: getUsers, setData:x } = useAxiosOnMount(`/api/patients/${id}`)
  const [show, setShow] = useState(false)
  const [physicianID, setPhysicianID] = useState(null)
  const [appointment, setAppointment] = useState(new Date())
  const [createLoading, setCreateLoading] = useState(false)
  const [createError, setCreateError] = useState(null)

  if (loading || error) {
    return <LoaderAndError fullError loading={loading} error={error} loaderMessage={'Loading URL, please wait'} />
  }

  const handleChange = (event, data) => {
    setPhysicianID(data.value)
  }

  const handleSubmit = async () => {
    setCreateLoading(true)
    try {
      let res = await axios.post(`/api/appointments`, { patient_id: id, physician_id: physicianID, appointment_date: appointment })
      // getPatients()
      // x({...data, appointments:[res.data, ...data.physicians]})
      setCreateLoading(false)
    } catch (err) {
      debugger
      setCreateLoading(false)

      setCreateError({message: JSON.stringify(err.response.data, null, 2)})
    }
  }

  const renderPhysicians = () => {
    return data.physicians.map(object => {
      return(
        <>
        <Card>
        <h2>Appointment {object.physician.id}</h2>
        <h3>Physician: {object.physician.name}</h3>
        <h4>Appointment date: {object.appointment}</h4>
        <br/>
        </Card>
        </>
      )}

    )
  }

  const getPhysicianOptions = () => {
    return data.physicians.map(d => {
      return { key: d.physician.name, value: d.physician.id, text: d.physician.name }
    })
  }

  const renderForm = () => {
    if (createLoading || createError) {
      return <LoaderAndError loading={createLoading} error={createError} loaderMessage={'Creating Appointment, please wait'} />
    }

  }

 return (
  <>
    <div>
      {data && <h1>Appointments for: {data.patient.name}</h1>}
        <Button onClick={() => setShow(!show)}>Add Appointment</Button>
        {show &&
          <div>
            <br/>
            {renderForm()}
            <Form onSubmit={handleSubmit}> 
              <Form.Field>
                <label>Date</label>
                <input value={appointment} onChange={(e) => setAppointment(e.target.value)} type='date' min='0' placeholder='Date' />
              </Form.Field>
              <Form.Field>
                <label>Physician</label>
                <Select onChange={handleChange} placeholder='Select Physician' options={data && getPhysicianOptions()} />
              </Form.Field>

              <SEMButton type='submit'>Submit</SEMButton>
            </Form>



          </div>
         }
      <AxiosContainer fullError loading={loading} error={error} loaderMessage={'Loading, please wait'}>
          <CardContainer>
            {data && renderPhysicians()}
          </CardContainer>
      </AxiosContainer>
    </div>
  </>
 )
}

export default PatientShow


