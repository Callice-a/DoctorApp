import useAxiosOnMount from '../hooks/useAxiosOnMount'
import AxiosContainer from '../components/AxiosContainer'
import List from '../components/List'
import { Link } from 'react-router-dom'
import CardContainer from '../components/CardContainer'
import Card from '../components/Card'
import { Header, Button as SEMButton } from 'semantic-ui-react'
import Button from '../components/Button'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'

const Patients = (props)=>{
  const {data, loading, error} = useAxiosOnMount('/api/patients') 
  let history = useHistory()
  const [patients, setPatients] = useState([])

  useEffect(()=>{
    getPatients()
  }, [])

  const getPatients = async () => {
    try{
    let res = await axios.get(`/api/patients`)
    setPatients(res.data)
    }catch(err){
      alert('Items error, check console/rails terminal')
    }
  }


  const deletePatient = async (id) => {
    let res = await axios.delete(`/api/patients/${id}`)
    const filterPatients = patients.filter(x => x.id !=id)
    setPatients(filterPatients)
  }

  const renderPatients = () => {
    return(
      <List name='Patients'
            data={patients}
            renderData={(patient)=> { 
              return(
                <Card>
                  <Link to={`/patients/${patient.id}`}>
                         <h1>{patient.name}</h1>
                  </Link>
                  <SEMButton>Edit</SEMButton>
                  <SEMButton onClick={()=>deletePatient(patient.id)} color='red'>Delete</SEMButton>
                </Card>
              )} 
            }
          />
    )
  }

  return (
     <AxiosContainer fullError loading={loading} error={error} loaderMessage={'Loading, please wait'}>
       <CardContainer>
          {renderPatients()}
        </CardContainer>
     </AxiosContainer>
  )
}

export default Patients