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
    date: Date.now(),
    visible: true,
    infoVisible: true,
  }],
  newGame: {
    name: "",
    genre: '',
    played: false,
    beaten: false
  },
  currentGame: {
    name: "",
    genre: '',
    played: false,
    beaten: false,
    date: Date.now,
    selected: true,
    visible: true
  },
  user: {
    name: 'Aaron',
    gamesBeaten: 0,
    gamesUnbeaten: 0
  }
}

let store = configureStore(initialState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
