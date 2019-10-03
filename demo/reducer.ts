import { AnyAction } from 'redux'
import { DECREMENT, INCREMENT, NEXT_PRIME } from './actions'
import { nextPrime } from './lib/primes'

export type State = {
  value: number
  prime: number
}

const initialState = {
  value: 0,
  prime: 10 ** 15 + 37,
}

function reducer(state: State = initialState, action: AnyAction) {
  switch (action.type) {
    case DECREMENT: {
      const { step } = action.payload
      return { ...state, value: state.value - step }
    }
    case INCREMENT: {
      const { step } = action.payload
      return { ...state, value: state.value + step }
    }
    case NEXT_PRIME: {
      return { ...state, prime: nextPrime(state.prime) }
    }

    default:
      return state
  }
}

export default reducer
