import React, {useContext} from 'react'
import SPDataContext from './SPDataContext.jsx'
import JsonDisplay from '../util/JsonDisplay.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionDetails from '@mui/material/AccordionDetails'
import SPEntry from './SPEntry.jsx'


function SPMain() {

    const {width} = useWindowSize()
    const smallWindow = width <= 560

    const {speedPicks, bestTimes, handleSort = []} = useContext(SPDataContext)

    const divStyle = {
        width: '100%', padding: '0px', marginBottom: 12, alignItems: 'top',
        marginLeft: 'auto', marginRight: 'auto', justifyContent: 'top'
    }
    const divFlexStyle = !smallWindow ? {display: 'flex'} : {}
    const combinedDivStyle = {
        ...divStyle,
        ...divFlexStyle
    }
    const tableWidth = '100%'
    const fontSize = '.8rem'

    return (
        <React.Fragment>

            {speedPicks.data.map((entry, index) =>
                <SPEntry key={index} entry={entry} bestTimes={bestTimes}/>
            )}
            <div style={{height: 100}}/>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} style={{fontSize: '1.2rem'}}>
                    JSON DATA
                </AccordionSummary>
                <AccordionDetails>
                <div style={combinedDivStyle}>
                    <div>
                        <JsonDisplay json={speedPicks.data} jsonName={'speedPicks'}/>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
</React.Fragment>
)
}

export default SPMain
