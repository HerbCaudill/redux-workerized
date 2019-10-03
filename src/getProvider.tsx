import React from 'react'
import { useStore } from './hooks'

export const StateContext = React.createContext<any>(null as any)
export const StoreContext = React.createContext(null as any)

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
