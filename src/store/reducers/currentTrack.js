import {
	SET_INITIAL_TRACK,
	SET_CURRENT_TRACK,
	SET_NEXT_TRACK,
	SET_PREVIOUS_TRACK,
	RESET_PLAYER,
} from '../actions';

const currentTrack = (state = null, action) => {
	switch (action.type) {
		case SET_INITIAL_TRACK:
			return action.track;
		case SET_CURRENT_TRACK:
			return action.track;
		case SET_NEXT_TRACK:
			return action.track;
		case SET_PREVIOUS_TRACK:
			return action.track;
		case RESET_PLAYER:
			return null;
		default:
			return state;
	}
};

export default currentTrack;
