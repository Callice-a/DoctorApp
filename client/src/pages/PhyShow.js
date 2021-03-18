import { useParams } from "react-router"
import AxiosContainer from "../components/AxiosContainer"
import StringifyJson from "../components/StringifyJSON"
import useAxiosOnMount from "../hooks/useAxiosOnMount"



const PhyShow = (props)=>{
  const {id} = useParams()
  const { data, loading, error } = useAxiosOnMount(`/api/physicians/${id}`)
  return(
    <AxiosContainer fullError loading ={loading} error={error} loaderMessage={'Keep your damn pants on! Its still loading!'}>
      <StringifyJson json={data} />
    </AxiosContainer>
  )
}
export default PhyShow