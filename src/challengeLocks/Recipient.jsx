import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {useContext} from 'react'
import SPDataContext2 from '../speedPicks/SPDataContext.jsx'

const Recipient = ({recipient}) => {

    const {getPersonFromId = []} = useContext(SPDataContext2)
    const picker = getPersonFromId(recipient.pickerId)
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                {picker.name}
            </AccordionSummary>
            <AccordionDetails>
                {picker.location}
            </AccordionDetails>
        </Accordion>
    )
}

export default Recipient
