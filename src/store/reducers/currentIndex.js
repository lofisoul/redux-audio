import {
	SET_CURRENT_TRACK,
	INCREMENT_PLAYLIST,
	DECREMENT_PLAYLIST,
} from '../actions';

const currentIndex = (state = 0, action) => {
	switch (action.type) {
		case SET_CURRENT_TRACK:
			return action.currentIndex;
		default:
			return state;
	}
};

export default currentIndex;
