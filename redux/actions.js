export default actions = {
  addGame(game) {
    return {
      type: 'ADD_GAME',
      game: game
    }
  }
}

// store.dispatch(addGame(game));
