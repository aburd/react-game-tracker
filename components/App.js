import React, { Component } from 'react'
import GameForm from './GameForm'
import Games from './Games'
import $ from 'jquery'
import path from 'path'
require("../sass/main.scss")

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {games: []}
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    return $.ajax({
        url: './games',
        method: 'GET',
        error: function(e) { console.log('Error:', e) },
        success: (games, status) => {
          return this.setState({games: games})
        }
    }).done((games) => {
      console.log('This is the done block running.')
    })
  }

  render() {
    return (
      <div className="container">
        {/* TITLE BAR */}
        <div id="titlebar">
          <img src="img/snes.png" />
          <h1>Me Play Games</h1>
        </div>
        {/* BEGIN COMPONENTS */}
        <GameForm />
        <Games titles={this.state.games} />
      </div>
    )
  }
}

export default App
