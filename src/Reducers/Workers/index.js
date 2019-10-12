const initialState = {
	list: null,
};

export function workersReducer(state = initialState, action) {
	switch (action.type) {
		case 'WORKERS_GET':
			return {
				...state,
				list: action.payload,
			};

		default:
			return state;
	}
}