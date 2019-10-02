import { AnyAction } from 'redux'

// A workerized store is just like a Redux store but with everything async
export type ProxyStore<State, Snapshot = State, A extends AnyAction = AnyAction> = {
  getState(): Promise<State>
  dispatch(action: A): Promise<void>
  subscribe(
    listener: (state: Snapshot) => void,
    selector?: (root: State) => Promise<Snapshot> | Snapshot
  ): Promise<number>
  unsubscribe(listenerId: number): Promise<void>
}
