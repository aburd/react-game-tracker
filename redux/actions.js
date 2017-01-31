export const constants = {
  ADD_GAME: 'ADD_GAME',
  REMOVE_GAME: 'REMOVE_GAME',
  EDIT_GAME: 'EDIT_GAME',
  GET_GAME: 'GET_GAME',
  RESET_NEW_GAME: 'RESET_NEW_GAME',
  GET_GAMES_FROM_SERVER: 'GET_GAMES_FROM_SERVER',
  TOGGLE_GAME_INFORMATION: 'TOGGLE_GAME_INFORMATION',
  SHOW_ALL_GAMES: 'SHOW_ALL_GAMES',
  TOGGLE_BEATEN: 'TOGGLE_BEATEN',
  TOGGLE_SELECTED: 'TOGGLE_SELECTED',
}

export default {
  addGame(game) {
    return {
      type: constants.ADD_GAME,
      game: game
    }
  },
  removeGame(_id) {
    return {
      type: constants.REMOVE_GAME,
      game: _id
    }
  },
  editGame(game) {
    return {
      type: constants.EDIT_GAME,
      game: game
    }
  },
  resetNewGame() {
    return {
      type: constants.RESET_NEW_GAME,
      newGame: {
        name: '',
        genre: '',
        beaten: false,
        played: false
      }
    }
  },
  getGame(_id) {
    return {
      type: constants.GET_GAME,
      id: _id
    }
  },
  getGamesFromServer(games) {
    return {
      type: constants.GET_GAMES_FROM_SERVER,
      games: games,
    }
  },
  toggleGameInformation(_id) {
    return {
      type: constants.TOGGLE_GAME_INFORMATION,
      id: _id
    }
  },
  showAllGames() {
    return {
      type: constants.SHOW_ALL_GAMES
    }
  },
  toggleBeaten(beaten) {
    return {
      type: constants.TOGGLE_BEATEN,
      beaten: beaten
    }
  },
  toggleSelected(_id) {
    return {
      type: constants.TOGGLE_SELECTED,
      id: _id,
    }
  }
}
