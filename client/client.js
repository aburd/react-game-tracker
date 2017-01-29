import React from 'react'
import { render } from 'react-dom'
import App from '../components/App'
import configureStore from '../redux/store'
import { Provider } from 'react-redux'

let initialState = {
  games: [{
    _id: 1,
    name: "Initial game",
    genre: ["Genre"],
    played: true,
    beaten: true,
    date: Date.now()
  }]
}

let store = configureStore(initialState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
