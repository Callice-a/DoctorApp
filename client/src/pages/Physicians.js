import AxiosContainer from '../components/AxiosContainer'
import List from '../components/List'
import { Link } from 'react-router-dom'
import CardContainer from '../components/CardContainer'
import useAxiosOnMount from '../hooks/useAxiosOnMount'

const Physicians = (props)=>{
  const{data, loading, error } = useAxiosOnMount('/api/physicians')
  return(
    <AxiosContainer fullError loading={loading} error={error} loaderMessage={'Loading, Wait a second, you dolt'}>
      <List name='PHYSICIANS'
        data={data}
        renderData={(physician)=> {
          return(
            <Link to={`/physicians/${physician.id}`}>
              <CardContainer>
                <p>{physician.name}</p>
              </CardContainer>
            </Link>
          )}
        }
      />
    </AxiosContainer>
  )
}
export default Physicians