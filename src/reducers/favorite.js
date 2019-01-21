function addFavorites(state = [], action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      return [];
    case "REMOVE_FAVORITE":
      return [];
    default:
      return state;
  }
}

function favorites(state = {}, action) {
  if (typeof action.postId !== undefined) {
    return {
      // Take the current state
      ...state,
      // overwrite this post with the new one
      [action.postId]: addFavorites(state[action.postId], action)
    };
  }
}

export default favorites;
