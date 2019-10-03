import React, { useState, useEffect, useContext } from 'react'
import * as Comlink from 'comlinkjs'
import { Dispatch, AnyAction } from 'redux'
import { ProxyStore } from '.'

const StateContext = React.createContext<any>(null as any)
const StoreContext = React.createContext(null as any)

type Selector<T> = (state: T) => any

export function useSelector<State>(valueSelector: Selector<State>): any {
  const state = useContext(StateContext)
  return valueSelector(state)
}

export function useDispatch<A extends AnyAction>(): Dispatch<A> {
  const proxy = useContext(StoreContext)
  return proxy.dispatch
}

export async function getProvider<State>(worker: Worker) {
  const store: ProxyStore<State> = Comlink.proxy(worker) as any

  let currentState = await store.getState()

  function useStore(): [State, ProxyStore<State>] {
    const [state, setState] = useState<State>(currentState)

    // subscribe to state in worker
    useEffect(() => {
      const subscriptionIdPromise = store.subscribe(
        Comlink.proxyValue((s: State) => {
          currentState = s
          setState(s)
        })
      )

      currentState == null
      store.getState().then(async (s: State) => {
        currentState = s
        setState(s)
      })

      return async () => {
        const subscriptionId: number = await subscriptionIdPromise
        store.unsubscribe(subscriptionId)
      }
    }, [])

    return [state, store]
  }

  const waiting = <div>Waiting...</div>

  interface WorkerContextProps {
    children: React.ReactNode
    fallback: JSX.Element
  }
  return function Provider({ children, fallback = waiting }: WorkerContextProps) {
    const [state, store] = useStore()

    return state ? (
      <StoreContext.Provider value={store}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </StoreContext.Provider>
    ) : (
      fallback
    )
  }
}
