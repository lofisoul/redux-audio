import {
	TOGGLE_PLAY_STATUS,
	CLICK_TRACK_PLAY,
	SET_INITIAL_TRACK,
	RESET_PLAYER,
} from '../actions';

const playStatus = (state = false, action) => {
	console.log(action);
	switch (action.type) {
		case TOGGLE_PLAY_STATUS:
			return !action.playStatus;
		case CLICK_TRACK_PLAY:
			return !state;
		case SET_INITIAL_TRACK:
			return !state;
		case RESET_PLAYER:
			return false;
		default:
			return state;
	}
};

export default playStatus;
