const initialState = {
  username: null,
  tokenAuth: localStorage.getItem('tokenAuth'),
  loading: false,
  error_message: null,
};
export function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'USER_LOGIN':
      return {
        ...state,
        username: action.payload.username,
        tokenAuth: action.payload.tokenAuth,
      };

    case 'USER_LOGIN_OR_REG_ERROR':
      return {
        ...state,
        error_message: action.payload,
      };

    case 'USER_LOGOUT':
      return {
        ...state,
        tokenAuth: null,
    };

    default:
      return state;
  }
}