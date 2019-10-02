// Constants

export const INCREMENT = 'counter/increment'
export const DECREMENT = 'counter/decrement'

export interface CounterAction {
  type: typeof INCREMENT | typeof DECREMENT
  payload: { step: number }
}

export const actions: { [key: string]: (step: number) => CounterAction } = {
  increment: (step = 1) => ({ type: INCREMENT, payload: { step } }),
  decrement: (step = 1) => ({ type: DECREMENT, payload: { step } }),
}
