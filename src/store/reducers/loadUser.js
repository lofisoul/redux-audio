import {START_LOADING_USER, FETCH_USER} from '../actions';

const loadUser = (state = false, action) => {
	switch (action.type) {
		case START_LOADING_USER:
			return true;
		case FETCH_USER:
			return false;
		default:
			return state;
	}
};

export default loadUser;
