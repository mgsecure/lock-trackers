import React, {useCallback, useState} from 'react'
import CLMain from '../challengeLocks/CLMain.jsx'
import SPMain from '../speedPicks/SPMain.jsx'
import TopNav from './TopNav.jsx'

function MainPage() {

    const [selected, setSelected] = useState('sp')
    const handleChange = useCallback(newValue => setSelected(newValue), [])

    const [sort, setSort] = useState('lock')
    const handleSort = useCallback(newValue => setSort(newValue), [])

    return (
        <div style={{maxWidth:700}}>
            <TopNav handleChange={handleChange} handleSort={handleSort}/>
            { selected === 'cl' &&
                <CLMain/>
            }
            { selected === 'sp' &&
                <SPMain sort='lock'/>
            }

        </div>
    )
}

export default MainPage