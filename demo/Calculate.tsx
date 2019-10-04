import React from 'react'
import { actions } from './redux/actions'
import { State } from './redux/reducer'
import { Dispatch } from 'redux'

// When doing calculations in UI thread, React won't update at all if we don't do this
export const nextFrame = () => new Promise(ok => requestAnimationFrame(ok))

export const Calculate = ({ state, dispatch }: { state: State; dispatch: Dispatch }) => {
  const calculate = async () => {
    dispatch(actions.setBusy(true))
    await nextFrame()
    for (let i = 0; i < 10; i++) {
      dispatch(actions.nextPrime())
      await nextFrame()
    }
    dispatch(actions.setBusy(false))
  }

  return (
    <p>
      <button onClick={calculate}>{state.busy ? 'Calculating...' : 'Calculate'}</button>
      {state.prime}
    </p>
  )
}
