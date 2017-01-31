import React, { Component } from 'react'
import { connect } from 'react-redux'

class User extends Component {
  render() {
    const totalGames = this.props.games.length
    const beaten = this.props.games.filter(game => game.beaten).length
    return (
      <div>
        <div className="col-xs-6">
          <strong>User: </strong> <br />
          <strong>Total Games: </strong> <br />
          <strong>Games Unbeaten: </strong>
        </div>
        <div className="col-xs-6">
          {this.props.user.name} <br />
          {totalGames.toString()} <br />
          {(totalGames - beaten).toString()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    games: state.games,
    user: state.user
  }
}

export default connect(mapStateToProps)(User)
