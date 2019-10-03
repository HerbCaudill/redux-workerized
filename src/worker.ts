import { ProxyStore } from '.'
import { AnyAction, Store } from 'redux'

import isEqual from 'lodash.isequal'

let _cnt = 0

function uniqueId() {
  return ++_cnt
}

export function createProxyStore<State>(store: Store<State>): ProxyStore<State> {
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
