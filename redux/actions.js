export const constants = {
  ADD_GAME: 'ADD_GAME',
  REMOVE_GAME: 'REMOVE_GAME',
  EDIT_GAME: 'EDIT_GAME',
  GET_GAME: 'GET_GAME',
  RESET_NEW_GAME: 'RESET_NEW_GAME',
  GET_GAMES_FROM_SERVER: 'GET_GAMES_FROM_SERVER',
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
  }
}
