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