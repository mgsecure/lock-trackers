import React, {useContext} from 'react'
import CLDataContext from './CLDataContext.jsx'
import JsonDisplay from '../util/JsonDisplay.jsx'

function CLMain() {

    const {locks = []} = useContext(CLDataContext)

    console.log(locks)

    return (
        <React.Fragment>

            <JsonDisplay json={locks} jsonName={'broken'}/>

        </React.Fragment>
    )
}

export default CLMain
