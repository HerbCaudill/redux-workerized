import React from 'react'
import ReactCountdownClock from 'react-countdown-clock'
import { useDispatch, useSelector } from '../src'
import { actions } from './actions'
import { State } from './reducer'

export function App() {
  const prime = useSelector((state: State) => state.prime)
  const busy = useSelector((state: State) => state.busy)

  const dispatch = useDispatch()

  const nextPrime = () => {
    dispatch(actions.setBusy(true))
    dispatch(actions.nextPrime())
  }

  return (
    <div>
      <ReactCountdownClock seconds={60} color="teal" size={150} />
      <div>
        {prime}
        <button onClick={nextPrime}>{busy ? 'Calculating...' : 'Next prime'}</button>
      </div>
    </div>
  )
}
