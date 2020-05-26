import {
	SET_INITIAL_TRACK,
	SET_CURRENT_TRACK,
	SET_NEXT_TRACK,
	SET_PREVIOUS_TRACK,
	RESET_PLAYER,
	STREAM_NEXT_TRACK,
} from '../actions';

const currentIndex = (state = 0, action) => {
	switch (action.type) {
		case SET_INITIAL_TRACK:
			return action.currentIndex;
		case SET_CURRENT_TRACK:
			return action.currentIndex;
		case SET_NEXT_TRACK:
			return state + 1;
		case STREAM_NEXT_TRACK:
			return state + 1;
		case SET_PREVIOUS_TRACK:
			return state - 1;
		case RESET_PLAYER:
			return 0;
		default:
			return state;
	}
};

export default currentIndex;
