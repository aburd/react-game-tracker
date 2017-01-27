export default function reducer(state, action) {
  switch(action.type) {
    case('ADD_GAME'):
      // return a new object, don't modify state
      return Object.assign({}, state, {
        games: [
          action.game,
          ...state.games // spread operator will put all old games below the new one
        ]
      })
    default:
      return state
  }
}
