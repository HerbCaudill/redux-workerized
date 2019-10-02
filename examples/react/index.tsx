import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { createContext } from '../../src/react'
import { actions } from './actions'
import { CounterState } from './reducer'

const start = async () => {
  // build worker

  const worker = new Worker('./worker.ts')

  const ctx = await createContext(worker)
  const { Provider, useSnapshot, useDispatch } = ctx

  // components

  function CounterApp() {
    const valueSelector = (state: CounterState): number => state.value
    const value = useSnapshot(valueSelector)
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
  ReactDOM.render(
    <Provider fallback={<div>Loading...</div>}>
      <CounterApp />
    </Provider>,
    document.querySelector('.root')
  )
}

start()
