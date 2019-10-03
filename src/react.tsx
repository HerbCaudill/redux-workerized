import React, { useState, useEffect, useContext } from 'react'
import * as Comlink from 'comlinkjs'
import { Dispatch, AnyAction } from 'redux'
import { ProxyStore } from '.'

const StateContext = React.createContext<any>(null as any)
const StoreContext = React.createContext(null as any)

type Selector<T> = (state: T) => any

interface ProviderProps {
  children: React.ReactNode
  fallback: JSX.Element
}

export async function getProvider(worker: Worker) {
  return function Provider({ children, fallback = <div>Waiting...</div> }: ProviderProps) {
    const [state, store] = useStore(worker)

    const provider = (
      <StoreContext.Provider value={store}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </StoreContext.Provider>
    )

    return state ? provider : fallback
  }
}

function useStore<T>(worker: Worker): [T, ProxyStore<T>] {
  const [state, setState] = useState<T>(null)
  const proxyStore: ProxyStore<T> = Comlink.proxy(worker) as any

  // get current state then subscribe to it
  useEffect(() => {
    proxyStore.getState().then(async (s: T) => setState(s))
    proxyStore.subscribe(Comlink.proxyValue((s: T) => setState(s)))
  }, []) // only on first render

  return [state, proxyStore]
}

export const useSelector = <T extends unknown>(valueSelector: Selector<T>): any => {
  const state = useContext(StateContext)
  return valueSelector(state)
}

export const useDispatch = <A extends AnyAction>(): Dispatch<A> => useContext(StoreContext).dispatch
