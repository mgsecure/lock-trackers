import React, {useCallback, useMemo, useState} from 'react'
import clData from './challengeLocks.json'
import belts from '../data/belts'

const CLDataContext = React.createContext({})
console.log(clData.locks)

export function DataProvider({children}) {

    //people, locks, recipients, lockBelts
    const people = useMemo(() => clData.people, [])
    const locks = useMemo(() => clData.locks, [])
    const recipients = useMemo(() => clData.recipients, [])
    const lockBelts = useMemo(() => belts, [])

    const valueX = useMemo(() => ({
        lockBelts,
        people,
        locks,
        recipients
    }), [
        lockBelts,
        people,
        locks,
        recipients
    ])

    const value = useMemo(() => ({
        locks
    }), [
        locks
    ])


    return (
        <CLDataContext.Provider value={value}>
            {children}
        </CLDataContext.Provider>
    )
}

export default CLDataContext
