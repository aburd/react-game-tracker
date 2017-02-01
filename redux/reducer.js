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
        games: state.games.filter( game => {
          return game._id !== action.id
        })
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
    case constants.RESET_NEW_GAME:
      return Object.assign({}, state, {
        newGame: action.newGame
      })
    case constants.GET_GAME:
      const selectedGame = state.games.filter(game => game._id === action.id)
      return Object.assign({}, state, {
        currentGame: selectedGame
      })
    case constants.GET_GAMES_FROM_SERVER:
      return Object.assign({}, state, {
        games: action.games
      })
    case constants.TOGGLE_GAME_INFORMATION:
      return Object.assign({}, state, {
        games: state.games.map( game => {
          if(game._id === action.id){
            game.infoVisible = !game.infoVisible
          }
          return game
        })
      })
    case constants.SHOW_ALL_GAMES:
      return Object.assign({}, state, {
        games: state.games.map( game => {
              game.visible = true
              return game
          })
      })
    case constants.TOGGLE_BEATEN:
      return Object.assign({}, state, {
        games: state.games.map( game => {
          if(game.beaten === action.beaten)
            game.visible = true
          else
            game.visible = false

          return game
        })
      })
    case constants.TOGGLE_SELECTED:
      var newGames = state.games.map((game) => {
          if(game._id === action.id)
            game.selected = true
          else
            game.selected = false
          return game
        })
      return Object.assign({}, state, {
        games: newGames,
        currentGame: state.games.filter(game => game._id === action.id)[0],
      })
    default:
      return state
  }
}


export default reducer
