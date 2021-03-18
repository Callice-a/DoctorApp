import useAxiosOnMount from '../hooks/useAxiosOnMount'
import AxiosContainer from '../components/AxiosContainer'
import StringifyJson from '../components/StringifyJSON.js'
import {useParams} from 'react-router-dom'
import CardContainer from '../components/CardContainer'
import Card from '../components/Card'

const PatientShow = (props)=>{
 const {id} = useParams()
 const {data, loading, error} = useAxiosOnMount(`/api/patients/${id}`)

  // trying to make physician/appointment data look nicer

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


 return (
   <>
   {data && <h1>Appointments for: {data.patient.name}</h1>}
     <AxiosContainer fullError loading={loading} error={error} loaderMessage={'Loading, please wait'}>
        <CardContainer>
          {data && renderPhysicians()}
        </CardContainer>
     </AxiosContainer>
     </>
 )
}

export default PatientShow