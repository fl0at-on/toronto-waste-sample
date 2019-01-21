export function updateSearchVal(text) {
  return {
    type: "UPDATE_SEARCH_VALUE",
    text: text
  };
}

export function returnAPIResults(searchValue) {
  return {
    type: "RETURN_API_RESULTS",
    searchValue: searchValue
  };
}

export function addFavorite(id) {
  return {
    type: "ADD_FAVORITE",
    id: id
  };
}

export function removeFavorite(id) {
  return {
    type: "REMOVE_FAVORITE",
    id: id
  };
}
