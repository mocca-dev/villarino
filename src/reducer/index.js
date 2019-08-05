function appReducer(state, action) {
  switch (action.type) {
    case "SET_TIMETABLES":
      return { ...state, timeTables: action.payload };

    default:
      break;
  }
}

export default appReducer;
