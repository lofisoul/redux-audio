import {
	SET_INITIAL_TRACK,
	SET_CURRENT_TRACK,
	SET_NEXT_TRACK,
	SET_PREVIOUS_TRACK,
} from '../actions';

const currentIndex = (state = 0, action) => {
	switch (action.type) {
		case SET_INITIAL_TRACK:
			return action.currentIndex;
		case SET_CURRENT_TRACK:
			return action.currentIndex;
		case SET_NEXT_TRACK:
			return state + 1;
		case SET_PREVIOUS_TRACK:
			return state - 1;
		default:
			return state;
	}
};

export default currentIndex;
