import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FieldValue from '../shared/FieldValue.jsx'
import React, {useContext} from 'react'
import DataContext from './CLDataContext.jsx'
import DataTableSimple from '../shared/DataTableSimple.jsx'

const LockDisplay = ({lock}) => {

    const {recipients, getPersonFromId = []} = useContext(DataContext)
    const lockRecipients = recipients.data.filter(recipient => recipient.lockId === lock.id)

    //const lock = challengeLocks.data.find(({id}) => id === lockId)
    const maker = getPersonFromId(lock.makerId)

    return (
        <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>} style={{fontSize:'1.2rem'}}>
                <span style={{fontWeight: 'bold'}}>{lock.name}</span> <span style={{marginLeft:10}}>(by: {maker.name})</span>
            </AccordionSummary>
            <AccordionDetails style={{display: 'block'}}>
                <div style={{display:'flex', marginBottom:'14px'}}>
                <FieldValue name='Lock type' value={lock.lockType}/>
                <FieldValue name='Pin count' value={lock.pinCount} style={{marginLeft: 55}}/>
                <FieldValue name='Made in' value={maker.location} style={{marginLeft: 55}}/>
                </div>
                Recipient List:
                <DataTableSimple lock={lock} data={lockRecipients}/>
            </AccordionDetails>
        </Accordion>
    )
}

export default LockDisplay
