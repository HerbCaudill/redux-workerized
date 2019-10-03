import '@babel/polyfill'
import * as Comlink from 'comlinkjs'
import { createStore } from 'redux'
import reducer from './reducer'
import { createProxyStore } from '../../src/worker'

const store = createStore(reducer)
const proxyStore = createProxyStore(store)

Comlink.expose({ ...proxyStore }, self)
