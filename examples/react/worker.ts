import '@babel/polyfill'
import { createStore } from 'redux'
import reducer from './reducer'
import { expose, createProxyStore } from '../../src/proxy'

const store = createStore(reducer)
const proxyStore = createProxyStore(store)

expose(proxyStore, self)
