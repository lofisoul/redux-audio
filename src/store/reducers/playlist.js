import {FETCH_TRACKS} from '../actions';

const playlist = (state = [], action) => {
	switch (action.type) {
		case FETCH_TRACKS:
			return action.playlist;
		default:
			return state;
	}
};

export default playlist;
