import useAxiosOnMount from '../hooks/useAxiosOnMount'
import AxiosContainer from '../components/AxiosContainer'
import StringifyJson from '../components/StringifyJSON.js'
import {useParams} from 'react-router-dom'
import CardContainer from '../components/CardContainer'

const PatientShow = (props)=>{
 const {id} = useParams()
 const {data, loading, error} = useAxiosOnMount(`/api/patients/${id}`) 

  // trying to make physician/appointment data look nicer
  // const renderPhysicians = () => {
  //   return data.physicians.map(physician => {
  //     console.log(physician.name)
  //     return(
  //       <>
  //       <h2>Appointment</h2>
  //       <h3>Physician: {physician}</h3>
  //       {/* <h4>Appointment date: {physician.appointment}</h4> */}
  //       </>
  //     )}

  //   )
  // }


 return (
     <AxiosContainer fullError loading={loading} error={error} loaderMessage={'Loading, please wait'}>
        <CardContainer>
          <StringifyJson json={data} />
        </CardContainer>
     </AxiosContainer>
 )
}

export default PatientShow