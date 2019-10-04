import { AnyAction } from 'redux'
import { NEXT_PRIME, SET_BUSY } from './actions'
import { nextPrime } from '../lib/primes'

export type State = {
  prime: number
  busy: boolean
}

const initialState = {
  prime: 861504408610801,
  busy: false,
}

function reducer(state: State = initialState, action: AnyAction) {
  switch (action.type) {
    case NEXT_PRIME: {
      return {
        ...state,
        prime: nextPrime(state.prime),
      }
    }
    case SET_BUSY: {
      const { value } = action.payload
      return {
        ...state,
        busy: value,
      }
    }
    default:
      return state
  }
}

export default reducer
