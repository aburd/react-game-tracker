import React, { Component } from 'react'
import { connect } from 'react-redux'
import GameForm from './GameForm'
import Games from './Games'
import actions from '../redux/actions'
import request from 'superagent'
require("../sass/main.scss")

import path from 'path'

class App extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    request
      .get('./api/games')
      .end(function(err, res) {
        if(err){ console.log(err) }
        const modifiedGames = res.body.map( game => {
          game.selected = false
          game.visible = true
          return game
        })
        this.props.dispatch(actions.getGamesFromServer(modifiedGames))
      }.bind(this))
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
        <Games titles={this.props.games} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(App)
