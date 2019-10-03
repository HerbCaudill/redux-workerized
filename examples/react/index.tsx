import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { getProvider } from '../../src/getProvider'
import { App } from './App'

const start = async () => {
  const worker = new Worker('./worker.ts')
  const Provider = await getProvider(worker)

  ReactDOM.render(
    <Provider fallback={<div>Loading...</div>}>
      <App />
    </Provider>,
    document.querySelector('.root')
  )
}

start()
