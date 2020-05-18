import {
	SET_CURRENT_TRACK,
	SET_NEXT_TRACK,
	SET_PREVIOUS_TRACK,
} from '../actions';

const currentTrack = (state = null, action) => {
	switch (action.type) {
		case SET_CURRENT_TRACK:
			return action.track;
		case SET_NEXT_TRACK:
			return action.track;
		case SET_PREVIOUS_TRACK:
			return action.track;
		default:
			return state;
	}
};

export default currentTrack;
