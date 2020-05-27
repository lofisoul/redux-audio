import {HANDLE_ERROR, REMOVE_ERROR} from '../actions';

const errorMsgs = (state = [], action) => {
	switch (action.type) {
		case HANDLE_ERROR:
			return [...state, action.errorMsg];
		case REMOVE_ERROR:
			let newState = [...state];
			newState.splice(action.index, 1);
			return newState;
		default:
			return state;
	}
};

export default errorMsgs;
