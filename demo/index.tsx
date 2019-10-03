import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { getProvider } from '../src'
import { App } from './App'

const start = async () => {
  const worker = new Worker('./worker.ts')
  const Provider = await getProvider(worker)

  ReactDOM.render(
    <Provider>
      <App />
    </Provider>,
    document.querySelector('.root')
  )
}

start()
