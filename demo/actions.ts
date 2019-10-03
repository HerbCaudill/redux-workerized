﻿import { AnyAction } from 'redux'

// Constants

export const INCREMENT = 'counter/increment'
export const DECREMENT = 'counter/decrement'
export const NEXT_PRIME = 'counter/nextPrime'

export interface CounterAction extends AnyAction {
  payload?: { step: number }
}

export const actions: { [key: string]: (step?: number) => CounterAction } = {
  increment: (step = 1) => ({ type: INCREMENT, payload: { step } }),
  decrement: (step = 1) => ({ type: DECREMENT, payload: { step } }),
  nextPrime: () => ({ type: NEXT_PRIME }),
}
