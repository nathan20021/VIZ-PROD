const FileSelectorReducer = (
  state = {
    index: 0,
    fileInfoArrays: []
  }, action) => {

    switch (action.type) {
      case "SET_CURRENT_FILE_ID":
        return {...state, index: action.payload}
      case "ADD_DIAGRAM":
        return {...state, fileInfoArrays: copy}
      case "SET_FILE_INFO_ARRAYS":
        return {...state, fileInfoArrays: action.payload}
      default:
        return state;
    }
};

export default FileSelectorReducer;
