import {FETCH_USER, RESET_USER, HANDLE_USER_ERROR} from '../actions';

const user = (state = null, action) => {
	switch (action.type) {
		case FETCH_USER:
			return action.user;
		case RESET_USER:
			return null;
		case HANDLE_USER_ERROR:
			return null;
		default:
			return state;
	}
};

export default user;
