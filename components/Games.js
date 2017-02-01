import React, { Component } from 'react'
import actions from '../redux/actions'
import { connect } from 'react-redux'
import request from 'superagent'
import User from './User'

class Games extends Component {
  constructor(props) {
    super(props)

    this.showAllGames = this.showAllGames.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.toggleBeaten = this.toggleBeaten.bind(this)
  }

  showAllGames() {
    this.props.dispatch(actions.showAllGames())
  }

  handleToggle(ev) {
    this.props.dispatch(actions.toggleSelected(ev.currentTarget.id))
  }

  toggleBeaten(beaten) {
    this.props.dispatch(actions.toggleBeaten(beaten))
  }

  toggleGameInformation(_id) {
    this.props.dispatch(actions.toggleGameInformation(_id))
  }

  removeGame(_id) {
    request
      .post('./api/games/delete')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({id: _id}))
      .end(function(err, res) {
        if(err) { console.log(err) }

        let response = JSON.parse(res.text)
        if(response.n > 0)
          console.log(response.n.toString() + ' document(s) deleted.')
        else
          console.log('Document ID not found.')

        this.props.dispatch(actions.removeGame(_id))
      }.bind(this))
  }

  getGames() {
    return this.props.titles.map( (title, i) => {
      const color = (i%3==0) ? "one" : (i%3==2) ? "two" : "three"
      const selected = title.selected ? 'selected': '';
      const listStyle = { display: title.visible ? 'block' : 'none' }
      const infoStyle = { display: title.infoVisible ? 'block' : 'none' }
      const toggleInformation = this.toggleGameInformation.bind(this, title._id)
      const removeGame = this.removeGame.bind(this, title._id)
      return (
        <div
          onClick={this.handleToggle}
          className={`row game ${selected} ${color}`}
          id={title['_id']}
          key={title['_id']}
          style={listStyle}
        >
          <div className="col-xs-9 col-md-6 left-text">
            <strong>{title.name}</strong><br />
            <div className="info" style={infoStyle}>
              Genre: {title.genre.join(', ')} <br />
              - I have {title.played ? 'played dis ish.': 'not played dis ish.'} <br />
              - I have {title.beaten ? 'beaten dis.' : 'not beaten dis.'}
            </div>
          </div>
          <div className="col-xs-3 col-md-6 text-right right-controls">
            <button onClick={toggleInformation} className="btn btn-info"><i className="glyphicon glyphicon-eye-open"></i></button>
            <button onClick={removeGame} className="btn btn-danger"><i className="glyphicon glyphicon-remove"></i></button>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div id="games">
        <div className="row">
          <div className="col-sm-6">
            <User />
          </div>
          <div className="col-sm-6 text-right" style={{'paddingRight': '0'}}>
            <button onClick={this.showAllGames} className="btn">All</button>
            <button onClick={this.toggleBeaten.bind(this, true)} className="btn">See Beaten</button>
            <button onClick={this.toggleBeaten.bind(this, false)} className="btn">Not Beaten</button>
          </div>
        </div>
        <div className="game-list container">
          {this.getGames()}
        </div>
      </div>
    )
  }
}

function mapPropsToState(state) {
  return {
    games: state.games,
    user: state.user
  }
}

export default connect(mapPropsToState)(Games)
