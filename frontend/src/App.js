import React from 'react'
import Routes from './services/routes'
import { Provider } from 'react-redux'

import { store } from './store/store'

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}
