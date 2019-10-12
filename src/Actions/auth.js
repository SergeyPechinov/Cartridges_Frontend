export const userLoginStart = (username, password) => {
  return {
    type: 'USER_LOGIN_START',
    payload: {
      username: username,
      password: password,
    }
  }
};

export const userLogin = (username, tokenAuth) => {
  return {
    type: 'USER_LOGIN',
    payload: {
      username: username,
      tokenAuth: tokenAuth,
    }
  }
};

export const userRegStart = (username, password) => {
  return {
    type: 'USER_REG_START',
    payload: {
      username: username,
      password: password,
    }
  }
};


export const userLoginOrRegError = message => {
  return {
    type: 'USER_LOGIN_OR_REG_ERROR',
    payload: message,
  }
};

export const userAuthLoading = status => {
  return {
    type: 'USER_LOGIN_LOADING',
    payload: status,
  }
};

export const userLogoutStart = () => {
  return {
    type: 'USER_LOGOUT_START',
  }
};

export const userLogout = () => {
  return {
    type: 'USER_LOGOUT',
  }
};