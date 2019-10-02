import React, { useState, useEffect, useContext } from 'react'
import * as Comlink from 'comlinkjs'
import { Dispatch, AnyAction } from 'redux'
import { ProxyStore } from '.'


const waiting = <div>Waiting...</div>

export const createContext = async <State>(worker: Worker) => {
  const SnapshotContext = React.createContext<State>(null as any)
  const StoreContext = React.createContext(null as any)
  const store: ProxyStore<State> = Comlink.proxy(worker) as any

  const currentState = await store.getState()
  let currentSnapshot: State = currentState

  function useStore(): [State, ProxyStore<State>] {
    const [state, setState] = useState<State>(currentSnapshot)
    currentSnapshot = state

    // subscribe to remote state
    useEffect(() => {
      const subscriptionIdPromise = store.subscribe(
        Comlink.proxyValue((state: State) => {
          currentSnapshot = state
          setState(state)
        }),
        Comlink.proxyValue(selector as any)
      )

      currentSnapshot == null
      store.getState().then(async (state: State) => {
        currentSnapshot = await selector(state)
        setState(currentSnapshot)
      })
      return async () => {
        const subscriptionId: number = await subscriptionIdPromise
        store.unsubscribe(subscriptionId)
      }
    }, [])

    return [state, store]
  }

  interface WorkerContextProps {
    children: React.ReactNode
    fallback: JSX.Element
  }
  function Provider({ children, fallback = waiting }: WorkerContextProps) {
    const [State, store] = useStore()
    return State ? (
      <StoreContext.Provider value={store}>
        <SnapshotContext.Provider value={State}>{children}</SnapshotContext.Provider>
      </StoreContext.Provider>
    ) : (
      fallback
    )
  }

  function useSnapshot(valueSelector: (State: State) => any): any {
    const State = useContext(SnapshotContext)
    return valueSelector(State)
  }

  function useDispatch<A extends AnyAction>(): Dispatch<A> {
    const proxy = useContext(StoreContext)
    return proxy.dispatch
  }

  return {
    Provider,
    useSnapshot,
    useDispatch,
  }
}
