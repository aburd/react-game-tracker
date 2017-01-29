import React, { Component } from 'react'
import { connect } from 'react-redux'
import request from 'superagent'
import actions from '../redux/actions'

class GameForm extends Component {
  constructor(props) {
    super(props)
  }


  createGame(e) {
    e.preventDefault();

    var game = {
      name: document.querySelector('#form-name').value,
      genre: document.querySelector('#form-genre').value,
      played: document.querySelector('#form-played').checked,
      beaten: document.querySelector('#form-beaten').checked
    }
    if(game.name != '' && game.genre != '') {
      request.post('./api/games')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(game))
        .end(function(err, res) {
          if(err) { console.log(err) }
          this.props.dispatch(actions.addGame(res.body))
          this.props.dispatch(actions.resetNewGame())
        }.bind(this))
    } else {
      alert('Name and Genre must not be blank')
    }

  }

  onGameChangeHandler (ev) {
    const property = ev.target.id.replace('form-', '');
    switch(property) {
      case('name'):
        this.setState({
          newGame: Object.assign(this.props.newGame, {name: ev.target.value})
        })
        break;
      case('genre'):
        this.setState({
          newGame: Object.assign(this.props.newGame, {genre: ev.target.value})
        })
        break;
      case('played'):
        this.setState({
          newGame: Object.assign(this.props.newGame, {played: !this.props.newGame.played})
        })
        break;
      case('beaten'):
        this.setState({
          newGame: Object.assign(this.props.newGame, {beaten: !this.props.newGame.beaten})
        })
        break;
      default:
        break;
    }
  }

  render() {
    const onGameChangeHandler = this.onGameChangeHandler.bind(this)
    const createGame = this.createGame.bind(this)

    return (
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="name">Title</label>
              <input value={this.props.newGame.name} onChange={onGameChangeHandler} id="form-name" className="form-control" placeholder="Super Dude" />
            </div>
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input value={this.props.newGame.genre} onChange={onGameChangeHandler} id="form-genre" className="form-control" type="text" placeholder="Sleeping Simulation" />
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input value={this.props.newGame.played} onChange={onGameChangeHandler} id="form-played" type="checkbox" className="form-check-played" />
                Played?
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input value={this.props.newGame.beaten} onChange={onGameChangeHandler} id="form-beaten" type="checkbox" className="form-check-beaten"/>
                Beaten?
              </label>
            </div>
            <button onClick={createGame} type="submit" className="btn btn-primary">Add Game</button>
          </form>
        </div>

        <div className="col-md-6">
          <div id="#preview">
            <p>
              <span>Name:</span> <strong>{this.props.newGame.name}</strong><br />
              <span>Genre:</span> {this.props.newGame.genre} <br />
              <span>Played:</span> {this.props.newGame.played ? 'Yes' : 'No'}<br />
              <span>Beaten:</span> {this.props.newGame.beaten ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

function mapPropsToState(state) {
  return {
    newGame: state.newGame
  }
}

export default connect(mapPropsToState)(GameForm)
