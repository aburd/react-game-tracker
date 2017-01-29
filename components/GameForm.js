import React, { Component } from 'react'
import $ from 'jquery'

class GameForm extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.state = {
      newGame: {
        name: "Super Smashing Brothers",
        genre: 'Placeholder Action!',
        played: false,
        beaten: false
      }
    }
  }

  createGame(e) {
    e.preventDefault();

    var game = {
      name: $('#form-name').val(),
      genre: $('#form-genre').val(),
      played: $('#form-played').is(':checked'),
      beaten: $('#form-beaten').is(':checked')
    }

    return $.ajax({
      url: './api/games',
      type: 'POST',
      dataType: "json",
      data: JSON.stringify(game),
      contentType: 'application/json; charset=UTF-8',
      error: function(e) { console.log('Error:', e) },
    }).done((game, status) => {
      console.log('Status', status)
      console.log('Game:', game)
    })

  }

  onGameChangeHandler (ev) {
    const property = ev.target.id.replace('form-', '');
    switch(property) {
      case('name'):
        this.setState({
          newGame: Object.assign(this.state.newGame, {name: ev.target.value})
        })
        break;
      case('genre'):
        this.setState({
          newGame: Object.assign(this.state.newGame, {genre: ev.target.value})
        })
        break;
      case('played'):
        this.setState({
          newGame: Object.assign(this.state.newGame, {played: !this.state.newGame.played})
        })
        break;
      case('beaten'):
        this.setState({
          newGame: Object.assign(this.state.newGame, {beaten: !this.state.newGame.beaten})
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
              <input onChange={onGameChangeHandler} id="form-name" className="form-control" placeholder="Super Dude" />
            </div>
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input onChange={onGameChangeHandler} id="form-genre" className="form-control" type="text" placeholder="Sleeping Simulation" />
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input onChange={onGameChangeHandler} id="form-played" type="checkbox" className="form-check-played" />
                Played?
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input onChange={onGameChangeHandler} id="form-beaten" type="checkbox" className="form-check-beaten"/>
                Beaten?
              </label>
            </div>
            <button onClick={createGame} type="submit" className="btn btn-primary">Add Game</button>
          </form>
        </div>

        <div className="col-md-6">
          <div id="#preview">
            <p>
              <span>Name:</span> <strong>{this.state.newGame.name}</strong><br />
              <span>Genre:</span> {this.state.newGame.genre} <br />
              <span>Played:</span> {this.state.newGame.played ? 'Yes' : 'No'}<br />
              <span>Beaten:</span> {this.state.newGame.beaten ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default GameForm
