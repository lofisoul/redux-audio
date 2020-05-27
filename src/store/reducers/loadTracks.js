import {START_LOADING_TRACKS, FETCH_TRACKS, HANDLE_ERROR} from '../actions';

const loadTracks = (state = false, action) => {
	switch (action.type) {
		case START_LOADING_TRACKS:
			return true;
		case FETCH_TRACKS:
			return false;
		case HANDLE_ERROR:
			return false;
		default:
			return state;
	}
};

export default loadTracks;
