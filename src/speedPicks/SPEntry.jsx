import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Button from '@mui/material/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FieldValue from '../shared/FieldValue.jsx'
import {ListItemText} from '@mui/material'
import formatTime from '../util/formatTime'

const SPEntry = ({entry, bestTimes}) => {

    const entryId = entry.lockId
    const bestTime = formatTime(bestTimes.get(entry.lockId))
    const isBestTime = entry.totalTime === bestTimes.get(entryId)
    const entryColor = isBestTime ? '#000' : '#aaa'
    const entryWeight = isBestTime ? 600 : 400

    const videoLinkText = entry.videoUrl.length > 50
        ? entry.videoUrl.substring(0, 50) + '...'
        : entry.videoUrl

    const divStyle = {margin: '14px 15px 0px 15px', fontSize: '1.1rem', color: entryColor, fontWeight: entryWeight}

    return (
        <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>} style={{fontSize: '1.2rem'}}>
                <ListItemText
                    primary={entry.lock}
                    primaryTypographyProps={{fontWeight: 600, color: entryColor}}
                    secondary={entry.version}
                    secondaryTypographyProps={{color: entryColor}}
                    style={{padding: '0px 0px 0px 10px'}}
                />
                <div style={divStyle}>{entry.picker}</div>
                <div style={divStyle}>{entry.totalTimeString}</div>
            </AccordionSummary>
            <AccordionDetails style={{display: 'block', padding:0}}>
                <div style={{textOverflow: 'ellipsis', marginLeft: 28, marginBottom:10}}>
                    <a href={entry.videoUrl} target='_blank'>{videoLinkText}</a>
                </div>
                <div style={{display: 'flex', marginBottom: '14px'}}>
                    <FieldValue name='Belt' value={entry.beltIndex} style={{marginLeft: 44}}/>
                    <FieldValue name='Picking starts' value={entry.start} style={{marginLeft: 44}}/>
                    <FieldValue name='Lock open' value={entry.open} style={{marginLeft: 44}}/>
                    <FieldValue name='Total time' value={entry.totalTimeString} style={{marginLeft: 44}}/>
                    <FieldValue name='Best time' value={`(${bestTime})`} style={{marginLeft: 44}}/>
                    <FieldValue name='Lock ID' value={entry.lockId} style={{marginLeft: 44}}/>
                </div>
            </AccordionDetails>
            <AccordionActions>
                <Button style={{}}>Edit</Button>
                <Button style={{color: '#777'}}>Archive</Button>
                <Button style={{color: '#B00'}}>Reject</Button>
                <Button style={{marginRight: 10}}>Approve</Button>
            </AccordionActions>
        </Accordion>
    )
}

export default SPEntry
