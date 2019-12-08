export const workersGetStart = token => {
	return {
		type: 'WORKERS_GET_START',
		payload: token,
	}
};

export const workersGet = data => {
	return {
		type: 'WORKERS_GET',
		payload: data,
	}
};

export const workersAddStart = (token, data, openCloseEditAddBlockWorker, addDelErrorAll, addCommonError) => {
	return {
		type: 'WORKERS_ADD_START',
		token: token,
		payload: data,
		openCloseEditAddBlockWorker,
		addDelErrorAll,
		addCommonError,
	}
};

export const workersDelStart = (token, id) => {
	return {
		type: 'WORKERS_DEL_START',
		token: token,
		payload: id,
	}
};

export const workersEditStart = (token, data, openCloseEditAddBlockWorker, addDelErrorAll, addCommonError) => {
	return {
		type: 'WORKERS_EDIT_START',
		token: token,
		payload: data,
		openCloseEditAddBlockWorker,
		addDelErrorAll,
		addCommonError,
	}
};
