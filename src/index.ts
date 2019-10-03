import { AnyAction } from 'redux'

// A workerized store is just like a Redux store but with everything async
export type ProxyStore<State, A extends AnyAction = AnyAction> = {
  getState(): Promise<State>
  dispatch(action: A): Promise<void>
  subscribe(
    listener: (state: State) => void,
    selector?: (root: State) => Promise<State> | State
  ): Promise<number>
  unsubscribe(listenerId: number): Promise<void>
}
