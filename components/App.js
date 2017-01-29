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
          return game
        })
        this.props.dispatch(actions.getGamesFromServer(modifiedGames))
      }.bind(this))
  }

  getBeaten() {
    request
      .get('./api/getBeaten')
      .end(function(err, res) {
        if(err) { console.log(err) }
        this.props.dispatch(actions.getGamesFromServer(res.body))
      }.bind(this))
  }

  getNotBeaten() {
    request
      .get('./api/getNotBeaten')
      .end(function(err, res) {
        if(err) { console.log(err) }
        this.props.dispatch(actions.getGamesFromServer(res.body))
      }.bind(this))
  }

  render() {
    const getBeaten = this.getBeaten.bind(this)
    const getNotBeaten = this.getNotBeaten.bind(this)
    return (
      <div className="container">
        {/* TITLE BAR */}
        <div id="titlebar">
          <img src="img/snes.png" />
          <h1>Me Play Games</h1>
        </div>
        <button onClick={getBeaten}>See Beaten</button>
        <button onClick={getNotBeaten}>Not Beaten</button>
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
