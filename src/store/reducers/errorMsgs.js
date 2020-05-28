import {
	HANDLE_USER_ERROR,
	HANDLE_TRACK_ERROR,
	REMOVE_ERROR,
	CLEAR_ERRORS,
} from '../actions';

const errorMsgs = (state = [], action) => {
	switch (action.type) {
		case HANDLE_TRACK_ERROR:
			return [...state, action.errorMsg];
		case HANDLE_USER_ERROR:
			return [...state, action.errorMsg];
		case REMOVE_ERROR:
			let newState = [...state];
			newState.splice(action.index, 1);
			return newState;
		case CLEAR_ERRORS:
			return [];
		default:
			return state;
	}
};

export default errorMsgs;
