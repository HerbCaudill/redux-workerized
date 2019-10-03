import isEqual from 'lodash.isequal'
import { AnyAction, Store } from 'redux'

// A workerized store is just like a Redux store but with all async methods
export type ProxyStore<State, A extends AnyAction = AnyAction> = {
  getState(): Promise<State>
  dispatch(action: A): Promise<void>
  subscribe(
    listener: (state: State) => void,
    selector?: (root: State) => Promise<State> | State
  ): Promise<number>
  unsubscribe(listenerId: number): Promise<void>
}

let lastId = 0
const uniqueId = () => ++lastId

export const createProxyStore = <T extends unknown>(store: Store<T>): ProxyStore<T> => {
  const listenerMap = new Map<number, Function>()
  return {
    async subscribe(onChangeHandler: Function): Promise<number> {
      const subscriptionId = uniqueId()
      let lastSnapshot = store.getState()
      const unsubscribe = store.subscribe(async () => {
        const newSnapshot = store.getState()
        if (!isEqual(lastSnapshot, newSnapshot)) {
          onChangeHandler(newSnapshot)
          lastSnapshot = newSnapshot
        }
      })
      listenerMap.set(subscriptionId, unsubscribe)
      return subscriptionId
    },

    async unsubscribe(subscriptionId: number) {
      const listener = listenerMap.get(subscriptionId)
      listener && listener()
      listenerMap.delete(subscriptionId)
    },

    async getState() {
      console.time('getState')
      const state = await store.getState()
      console.timeEnd('getState')
      return state
    },

    async dispatch(action: AnyAction) {
      console.time('dispatch')
      store.dispatch(action)
      console.timeEnd('dispatch')
    },
  }
}
