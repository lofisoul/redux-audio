import {START_LOADING_USER, FETCH_USER, HANDLE_USER_ERROR} from '../actions';

const loadUser = (state = false, action) => {
	switch (action.type) {
		case START_LOADING_USER:
			return true;
		case FETCH_USER:
			return false;
		case HANDLE_USER_ERROR:
			return false;
		default:
			return state;
	}
};

export default loadUser;
