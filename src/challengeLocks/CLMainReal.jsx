import React, {useContext} from 'react'
import CLDataContext from './CLDataContext.jsx'
import JsonDisplay from '../util/JsonDisplay.jsx'
import DisplayTable from '../shared/DisplayTable.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import LocksDataTable from './LocksDataTable.jsx'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionDetails from '@mui/material/AccordionDetails'
import LockDisplay from './LockDisplay.jsx'

function CLMain() {

    const {people, locks, recipients, lockBelts = []} = useContext(CLDataContext)
    console.log(locks)

    const {width} = useWindowSize()
    const smallWindow = width <= 560


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

            {locks.data.map((lock, index) =>
                <LockDisplay key={index} lock={lock}/>
            )}
            <div style={{height: 100}}/>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} style={{fontSize: '1.2rem'}}>
                    SAMPLE TABLE
                </AccordionSummary>
                <AccordionDetails>
                    <LocksDataTable/>
                </AccordionDetails>
            </Accordion>
            <div style={{height: 20}}/>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} style={{fontSize: '1.2rem'}}>
                    JSON DATA
                </AccordionSummary>
                <AccordionDetails>
                    <div style={combinedDivStyle}>
                        <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                            <DisplayTable tableData={people} tableWidth={tableWidth} fontSize={fontSize}/>
                            <JsonDisplay json={people.data} jsonName={'people'}/>
                        </div>
                        <div style={{width: '75px'}}>&nbsp;</div>
                        <div style={{display: 'inline-block', verticalAlign: 'top'}}>
                            <DisplayTable tableData={locks} tableWidth={tableWidth} fontSize={fontSize}/>
                            <JsonDisplay json={locks.data} jsonName={'locks'}/>
                        </div>
                    </div>
                    <div style={combinedDivStyle}>
                        <div>
                            <DisplayTable tableData={recipients} tableWidth={tableWidth} fontSize={fontSize}/>
                            <JsonDisplay json={recipients.data} jsonName={'recipients'}/>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </React.Fragment>
    )
}

export default CLMain
