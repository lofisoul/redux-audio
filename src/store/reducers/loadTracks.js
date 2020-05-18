import {START_LOADING_TRACKS, FETCH_TRACKS} from '../actions';

const loadTracks = (state = false, action) => {
	switch (action.type) {
		case START_LOADING_TRACKS:
			return true;
		case FETCH_TRACKS:
			return false;
		default:
			return state;
	}
};

export default loadTracks;
