import { useParams } from "react-router"
import AxiosContainer from "../components/AxiosContainer"
import Card from "../components/Card"
import CardContainer from "../components/CardContainer"
import useAxiosOnMount from "../hooks/useAxiosOnMount"
import LoadErr from "../components/LoadErr"


const PhyShow = (props)=>{
  const {id} = useParams()
  const { data, loading, error } = useAxiosOnMount(`/api/physicians/${id}`)
  const { data: datapp } = useAxiosOnMount(`/api/physicians/${id}/appointments`)

  if (loading || error ) {
    return <LoadErr fullError loading={loading} error={error} loaderMessage={'Loading in LoadErr'} />
  }
  
  const rendAps = () => {
    return datapp.map( p => {      // ** IF THE BROWSER WONT READ .MAP(UNDEF), REFRESH TERMINAL CONSOLE AND BROWSER, THEN IT WORKS ** //
      return (
        <div>
          <h2>Appointment: {p.id}</h2>
          <Card>
            <h3>Dr. {data.name}, M.D.</h3>
            <h4>Date: {p.appointment_date}</h4>
          </Card>
        </div>
      )}
    )
  }

  return(
    <div>
      { data && <h1>Dr. {data.name}'s Appointments</h1>}
        <AxiosContainer fullError loading ={loading} error={error} loaderMessage={'Keep your damn pants on! Its still loading!'}>
          <CardContainer>
            {data && rendAps()}
          </CardContainer>
        </AxiosContainer>
    </div>
  )

}
export default PhyShow