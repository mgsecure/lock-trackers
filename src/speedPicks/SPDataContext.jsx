import React, {useCallback, useMemo, useState} from 'react'
import lockJson from '../data/data.json'
import belts, {uniqueBelts} from '../data/belts'
import speedPickData from './speedPicks.json'
import entryName from '../data/entryName'
import formatTime from '../util/formatTime.jsx'

const SPDataContext = React.createContext({})

export function DataProvider({children}) {

    const lockBelts = useMemo(() => belts, [])

    const speedPicks = useMemo(() => speedPickData, [])
    const lockData = useMemo(() => lockJson, [])
    const bestTimes = useMemo(() => new Map(), [])

    speedPicks.data.map(row => {
        const lockId = row.lockId

        const thisLock = lockData?.find(({id}) => id === lockId)
        row.lock = entryName(thisLock, 'short')
        row.version = thisLock.version

        row.belt = thisLock.belt
        const beltLookup = thisLock.belt.startsWith('Black') ? 'Black' : thisLock.belt
        row.beltIndex = uniqueBelts.indexOf(beltLookup)

        function numSeconds(timeString) {
            const timeArray = timeString.split(':')
            return 3600 * timeArray[0] + 60 * timeArray[1] + 1 * timeArray[2]
        }

        const totalTime = numSeconds(row.open) - numSeconds(row.start)
        row.totalTime = totalTime
        row.totalTimeString = formatTime(totalTime)

        if (bestTimes.get(lockId)) {
            const bestTime = totalTime > bestTimes.get(lockId) ? bestTimes.get(lockId) : totalTime
            bestTimes.set(lockId, bestTime)
        } else {
            bestTimes.set(lockId, totalTime)
        }
    })

    const [sort, setSort] = useState('lock')
    const handleSort = useCallback(newValue => {
        setSort(newValue)
    }, [])
    //console.log(sort)

    const sorted = sort === 'belt'
        ? speedPicks?.data.sort((a, b) => {
            return a.beltIndex - b.beltIndex
                || a.lock.localeCompare(b.lock)
                || a.totalTime - b.totalTime
        })
        : sort === 'picker'
            ? speedPicks?.data.sort((a, b) => {
                return a.picker.localeCompare(b.picker)
                    || a.totalTime - b.totalTime
            })
            : speedPicks?.data.sort((a, b) => {
                return a.lock.localeCompare(b.lock)
                    || a.totalTime - b.totalTime
            })


    const getLockFromId = useCallback(lockId => {
        return lockData?.find(({id}) => id === lockId)
    }, [lockData])


    const value = useMemo(() => ({
        lockBelts,
        speedPicks,
        lockData,
        bestTimes,
        getLockFromId,
        handleSort
    }), [
        lockBelts,
        speedPicks,
        lockData,
        bestTimes,
        getLockFromId,
        handleSort
    ])

    return (
        <SPDataContext.Provider value={value} handleSort={handleSort}>
            {children}
        </SPDataContext.Provider>
    )
}

export default SPDataContext
