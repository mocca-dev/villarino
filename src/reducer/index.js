function appReducer(state, action) {
  switch (action.type) {
    case "SET_TIMETABLES":
      return { ...state, timetables: action.payload };
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
    case "SET_SEASSON":
      return {
        ...state,
        seassonSelected: action.payload
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
    case "SET_ONLINE":
      return {
        ...state,
        online: action.payload
      };
    case "SET_SPEECH_MODE":
      return {
        ...state,
        speechSetting: { ...state.speechSetting, active: action.payload }
      };
    case "SET_VOICE":
      return {
        ...state,
        speechSetting: { ...state.speechSetting, voice: action.payload }
      };
    case "SET_VELOCITY":
      return {
        ...state,
        speechSetting: { ...state.speechSetting, velocity: action.payload }
      };
    case "SET_SPEECH_SETTING":
      return {
        ...state,
        speechSetting: action.payload
      };
    default:
      return state;
  }
}

export default appReducer;
