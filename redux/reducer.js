import { constants } from './actions'

function reducer(state = {}, action) {
  switch(action.type) {
    case constants.ADD_GAME:
      return Object.assign({}, state, {
        games: [
          action.game,
          ...state.games
        ]
      })
    case constants.REMOVE_GAME:
      return Object.assign({}, state, {
        games: state.games.filter( game => game._id === action._id )
      })
    case constants.EDIT_GAME:
      return Object.assign({}, state, {
        games: state.games.map( (game) => {
          if(game._id === action.game._id) {
            return action.game
          }
          return game
        })
      })
    case constants.GET_GAMES_FROM_SERVER:
      return Object.assign({}, state, {
        games: action.games
      })
    default:
      return state
  }
}


export default reducer
