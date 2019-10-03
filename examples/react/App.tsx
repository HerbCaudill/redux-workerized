import React from 'react'
import { useDispatch, useSelector } from '../../src/hooks'
import { actions } from './actions'
import { CounterState } from './reducer'

export function App() {
  const valueSelector = (state: CounterState): number => state.value
  const value = useSelector(valueSelector)
  const dispatch = useDispatch()

  const increment = () => dispatch(actions.increment(1))
  const decrement = () => dispatch(actions.decrement(2))

  return (
    <div>
      <button onClick={decrement}>-</button>
      <label>{value}</label>
      <button onClick={increment}>+</button>
    </div>
  )
}
