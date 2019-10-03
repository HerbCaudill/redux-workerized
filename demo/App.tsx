import React from 'react'
import ReactCountdownClock from 'react-countdown-clock'
import { useDispatch, useSelector } from '../src'
import { actions } from './actions'
import { State } from './reducer'

export function App() {
  const value = useSelector((state: State): number => state.value)
  const prime = useSelector((state: State): number => state.prime)

  const dispatch = useDispatch()

  const increment = () => dispatch(actions.increment(1))
  const decrement = () => dispatch(actions.decrement(1))
  const nextPrime = () => dispatch(actions.nextPrime())

  return (
    <div>
      <ReactCountdownClock seconds={60} color="teal" size={150} />

      <div style={{ display: 'none' }}>
        <button onClick={decrement}>-</button>
        <label>{value}</label>
        <button onClick={increment}>+</button>
      </div>
      <div>
        <p>
          {prime}
          <button onClick={nextPrime}>Next prime</button>
        </p>
      </div>
    </div>
  )
}
