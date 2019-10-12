export const cartridgesGetStart = (token) => {
  return {
    type: 'CARTRIDGES_GET_START',
    payload: token,
  }
};

export const cartridgesGet = (data) => {
  return {
    type: 'CARTRIDGES_GET',
    payload: data,
  }
};