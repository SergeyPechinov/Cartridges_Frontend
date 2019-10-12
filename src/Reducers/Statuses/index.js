const initialState = {
  list: null,
};

export function statusesReducer(state = initialState, action) {
  switch (action.type) {
    case 'STATUSES_GET':
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
}