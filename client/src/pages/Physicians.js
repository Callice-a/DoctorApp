import AxiosContainer from '../components/AxiosContainer'
import List from '../components/List'
const Physicians = (props)=>{
  const{data, loading, error } = useAxiosOnMount('/api/physicians')
  return(
    <AxiosContainer fullError loading={loading} error={error} loaderMessage={'Loading, Wait a second, you dolt'}>
      <List name='PATIENTS'
        data={data}
      />
    </AxiosContainer>
  )
}
export default Physicians