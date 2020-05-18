import {SET_CURRENT_TRACK, SET_DEFAULT_CURRENT_TRACK} from '../actions';

const currentTrack = (state = null, action) => {
	switch (action.type) {
		case SET_DEFAULT_CURRENT_TRACK:
			return action.currentTrack;
		case SET_CURRENT_TRACK:
			return action.track;
		default:
			return state;
	}
};

export default currentTrack;
