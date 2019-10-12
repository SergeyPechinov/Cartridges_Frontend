const initialState = {
  list: null,
};

export function cartridgesReducer(state = initialState, action) {
  switch (action.type) {
    case 'CARTRIDGES_GET':
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
}