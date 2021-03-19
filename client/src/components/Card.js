import {useState} from 'react'
import { MEDIUM_SPACE } from '../styles'
import CardContainer from './CardContainer'
import {MEDIUM_SPACING} from '../styles'
import Fade from './Fade'
import Button from '../components/Button'

const Card = (props) => {
    const {header, children} = props
    const [hideBody, setHideBody] = useState(false)
    return (
        <CardContainer>
           <header style={{marginBottom: MEDIUM_SPACING, display:'flex', justifyContent:'space-between'}}>
               <h3>{header}</h3>
               <p onClick={()=> {setHideBody(!hideBody)}}>{hideBody ? <Button>Show</Button>: <Button>Collapse</Button>}</p>
           </header>
           {/* this is where my button/ nested content */}
           <Fade hide={hideBody}>
             {children}
           </Fade>
        </CardContainer>
    )
}

export default Card