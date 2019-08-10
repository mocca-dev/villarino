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
    case "CHANGE_FROM_LABEL":
      return {
        ...state,
        fromOptions: state.fromOptions.map(option =>
          option.value === action.payload.value
            ? {
                ...option,
                label: action.payload.label
              }
            : option
        )
      };
    case "SET_HOLIDAYS":
      return {
        ...state,
        holidays: action.payload
      };
    default:
      return state;
  }
}

export default appReducer;
