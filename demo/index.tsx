import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { getProvider } from '../src'

import reducer from './redux/reducer'
import { WithoutWorker } from './WithoutWorker'
import { WithWorker } from './WithWorker'
import { Clock } from './Clock'

const start = async () => {
  // Setup proxy provider
  const worker = new Worker('./redux/worker.ts')
  const ProxyProvider = await getProvider(worker)

  // Setup regular provider
  const store = createStore(reducer)
  const RegularProvider = ({ children }) => <Provider store={store}>{children}</Provider>

  ReactDOM.render(
    <div>
      <Clock></Clock>
      <p>
        Use the buttons to find a few large prime numbers. Without a worker, notice how the
        animation above freezes during each calculation.
      </p>
      <ProxyProvider>
        <WithWorker />
      </ProxyProvider>
      <RegularProvider>
        <WithoutWorker />
      </RegularProvider>
    </div>,
    document.querySelector('.root')
  )
}

start()
