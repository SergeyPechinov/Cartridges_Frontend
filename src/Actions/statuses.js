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

export const statusesAddStart = (token, data, closeFormAddStatus) => {
  return {
    type: 'STATUSES_ADD_START',
    token: token,
    closeFormAddStatus,
    payload: data,
  }
};

export const statusesAddError = message => {
  return {
    type: 'STATUSES_ADD_ERROR',
    payload: message,
  }
};

export const statusesAddErrorClear = () => {
  return {
    type: 'STATUSES_ADD_ERROR_CLEAR',
  }
};

export const statusesEditStart = (token, data, closeFormEditAddStatus, editAddStatusError) => {
  return {
    type: 'STATUSES_EDIT_START',
    token,
    closeFormEditAddStatus,
    editAddStatusError,
    payload: data,
  }
};

export const statusesDelStart = (token, id) => {
  return {
    type: 'STATUSES_DEL_START',
    token,
    payload: id,
  }
};