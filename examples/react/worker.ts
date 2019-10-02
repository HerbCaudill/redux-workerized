import '@babel/polyfill'
import * as Comlink from 'comlinkjs'
import { createStore } from 'redux'
import reducer from './reducer'
import { createWorkerizedStore } from '../../src/worker'

const store = createStore(reducer)
const storeAPI = createWorkerizedStore(store)

Comlink.expose({ ...storeAPI }, self)
