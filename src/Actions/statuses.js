export const statusesGetStart = token => {
  return {
    type: 'STATUSES_GET_START',
    payload: token,
  }
};

export const statusesGet = data => {
  return {
    type: 'STATUSES_GET',
    payload: data,
  }
};

export const statusesAddStart = (token, data) => {
  return {
    type: 'STATUSES_ADD_START',
    token: token,
    payload: data,
  }
};