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
import PatientsEdit from '../components/PatientsEdit'
import PatientsNew from '../components/PatientsNew'

const Patients = (props)=>{
  const {data, loading, error} = useAxiosOnMount('/api/patients') 
  let history = useHistory()
  const [show, setShow] = useState(false)
  const [patients, setPatients] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editID, setEditID] = useState(Number)
  
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

  const editOnClick = (patient) => {
    return(
      <SEMButton color='blue' onClick={()=> {setShowEditForm(!showEditForm); setEditID(patient.id)}}>{showEditForm && (editID === patient.id) ? 'Hide Form' : 'Edit'}</SEMButton>
    )
  }

  const hideEdit = (patient) => {
    
    if (patient.id===editID){
    return(
    <SEMButton color='red' onClick={()=> {setShowEditForm(!showEditForm); setEditID(-1)}}>Cancel Edit</SEMButton>
    )}
  }

  const renderPatients = () => {
    return(
      <List name='Patients'
            data={patients}
            renderData={(patient)=> { 
              return(
                <Card>
                    {(editID === patient.id) && showEditForm && <PatientsEdit getPatients={getPatients} setShowEditForm={setShowEditForm} patient={patient} patientID={patient.id} setEditID={setEditID}/>}

                  {(editID !== patient.id)&& <Link to={`/patients/${patient.id}`}>
                         <h1>{patient.name}</h1>
                  </Link>}
                  <div>
                    {!showEditForm ? editOnClick(patient) : hideEdit(patient)}
                    {(editID !== patient.id) && <SEMButton onClick={()=>deletePatient(patient.id)} color='red'>Delete</SEMButton>}
                  </div>
                </Card>
              )} 
            }
          />
    )
  }

  return (
    <div>
      {data && <h1>Patients</h1>}
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Add New Patient'}</Button>
        {showForm && <PatientsNew getPatients={getPatients} setShowForm={setShowForm}/>}

     <AxiosContainer fullError loading={loading} error={error} loaderMessage={'Loading, please wait'}>
       <CardContainer>
          {renderPatients()}
        </CardContainer>
     </AxiosContainer>
     </div>
  )
}

export default Patients