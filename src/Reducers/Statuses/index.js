const initialState = {
  list: null,
  errorAddMessage: '',
};

export function statusesReducer(state = initialState, action) {
  switch (action.type) {
    case 'STATUSES_GET':
      return {
        ...state,
        list: action.payload,
      };

    case 'STATUSES_ADD_ERROR':
      return {
        ...state,
        errorAddMessage: action.payload,
      };

    case 'STATUSES_ADD_ERROR_CLEAR':
      return {
        ...state,
        errorAddMessage: '',
      };

    default:
      return state;
  }
}