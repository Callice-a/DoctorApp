import useAxiosOnMount from '../hooks/useAxiosOnMount'
import AxiosContainer from '../components/AxiosContainer'
import List from '../components/List'
import { Link } from 'react-router-dom'
import CardContainer from '../components/CardContainer'

const Patients = (props)=>{
 const {data, loading, error} = useAxiosOnMount('/api/patients') 

 return (
     <AxiosContainer fullError loading={loading} error={error} loaderMessage={'Loading URL, please wait'}>
        <List name='Patients'
          data={data}
          renderData={(patient)=> { 
            return(
                <Link to={`/patients/${patient.id}`}>
                  <CardContainer>
                      <h3>{patient.name}</h3>
                  </CardContainer>
              </Link>
            )} 
          }
        />
     </AxiosContainer>
 )
}

export default Patients