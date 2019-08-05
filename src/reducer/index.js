function appReducer(state, action) {
  switch (action.type) {
    case "SET_TIMETABLES":
      return { ...state, timeTables: action.payload };
    case "SET_TO":
      return {
        ...state,
        fromToSelected: { ...state.fromToSelected, to: action.payload }
      };
    case "SET_FROM":
      return {
        ...state,
        fromToSelected: { ...state.fromToSelected, from: action.payload }
      };

    default:
      return state;
  }
}

export default appReducer;
