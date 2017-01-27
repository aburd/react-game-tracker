import React, { Component } from 'react'

class GameForm extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.state = {
      userGame: {
        title: "Super Smashing Brothers",
        genre: 'Placeholder Action!',
        played: false,
        beaten: false
      }
    }
  }

  onGameChangeHandler (ev) {
    const property = ev.target.id.replace('form-', '');
    switch(property) {
      case('title'):
        this.setState({
          userGame: Object.assign(this.state.userGame, {title: ev.target.value})
        })
        break;
      case('genre'):
        this.setState({
          userGame: Object.assign(this.state.userGame, {genre: ev.target.value})
        })
        break;
      case('played'):
        this.setState({
          userGame: Object.assign(this.state.userGame, {played: !this.state.userGame.played})
        })
        break;
      case('beaten'):
        this.setState({
          userGame: Object.assign(this.state.userGame, {beaten: !this.state.userGame.beaten})
        })
        break;
      default:
        break;
    }
  }

  render() {
    const onGameChangeHandler = this.onGameChangeHandler.bind(this)
    return (
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input onChange={onGameChangeHandler} id="form-title" className="form-control" placeholder="Super Dude" />
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
            <button type="submit" className="btn btn-primary">Add Game</button>
          </form>
        </div>

        <div className="col-md-6">
          <div id="#preview">
            <p>
              <span>Title:</span> <strong>{this.state.userGame.title}</strong><br />
              <span>Genre:</span> {this.state.userGame.genre} <br />
              <span>Played:</span> {this.state.userGame.played ? 'Yes' : 'No'}<br />
              <span>Beaten:</span> {this.state.userGame.beaten ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default GameForm
