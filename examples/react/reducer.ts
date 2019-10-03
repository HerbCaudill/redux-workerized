import { AnyAction } from 'redux'
import { DECREMENT, INCREMENT } from './actions'

export type CounterState = {
  value: number
}

const initialCounterState = {
  value: 0,
  // noise: makeNoise(10000),
}

function reducer(state: CounterState = initialCounterState, action: AnyAction) {
  switch (action.type) {
    case DECREMENT: {
      const { step } = action.payload
      return { ...state, value: state.value - step }
    }
    case INCREMENT:
      const { step } = action.payload
      return { ...state, value: state.value + step }
    default:
      return state
  }
}

export default reducer
