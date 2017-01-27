import React, { Component } from 'react'

class Games extends Component {
  constructor(props) {
    super(props)
  }

  getGames() {
    return this.props.titles.map( (title) => {
      return (
        <div className="row game" key={title['_id']}>
          <div className="col-xs-9 col-md-5 left-text">
            <strong>{title.name}</strong><br />
            Genre: {title.genre.join(', ')} <br />
            - I have {title.played ? 'played dis ish.': 'not played dis ish.'} <br />
          - I have {title.beaten ? 'beaten dis.' : 'not beaten dis.'}
          </div>
          <div className="col-xs-3 col-md-1 right-controls">
            <button> - </button>
            <button> X </button>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="game-list container">
        {this.getGames()}
      </div>
    )
  }
}

export default Games
