import store from '../../store';

export const START_LOADING_USER = 'START_LOADING';
export const FETCH_USER = 'FETCH_USER';
export const START_LOADING_TRACKS = 'START_LOADING_TRACKS';
export const FETCH_TRACKS = 'FETCH_TRACKS';
export const STORE_PLAYLIST = 'STORE_PLAYLIST';
export const SET_INITIAL_TRACK = 'SET_INITIAL_TRACK';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const PLAY_TRACK = 'PLAY_TRACK';
export const SET_NEXT_TRACK = 'SET_NEXT_TRACK';
export const STREAM_NEXT_TRACK = 'STREAM_NEXT_TRACK';
export const SET_PREVIOUS_TRACK = 'SET_PREVIOUS_TRACK';
export const TOGGLE_PLAY_STATUS = 'TOGGLE_PLAY_STATUS';
export const CLICK_TRACK_PLAY = 'CLICK_TRACK_PLAY';
export const RESET_PLAYER = 'RESET_PLAYER';
export const RESET_USER = 'RESET_USER';

export const fetchUser = username => (dispatch, getState, api) => {
	dispatch(loadUser());
	api.fetchUser(username)
		.then(user => {
			dispatch(storeUser(user));
		})
		.catch(err => {
			console.log(err);
		});
};

const loadUser = () => ({
	type: START_LOADING_USER,
});

const storeUser = user => ({
	type: FETCH_USER,
	user,
});

//playlist config
export const fetchTracks = username => (dispatch, getState, api) => {
	dispatch(loadTracks());
	api.createPlaylist(username).then(playlist => {
		dispatch(storeTracks(playlist));
		return playlist;
	});
};

const loadTracks = () => ({
	type: START_LOADING_TRACKS,
});

const storeTracks = playlist => ({
	type: FETCH_TRACKS,
	playlist,
});

//set current track for player
// export const getCurrentTrack = id => (dispatch, getState, api) => {
// 	api.fetchTrack(id).then(track => {
// 		dispatch(setCurrentTrack(track));
// 	});
// };

export const setInitialTrack = (track, currentIndex) => ({
	type: SET_INITIAL_TRACK,
	track,
	currentIndex,
});

export const setCurrentTrack = (track, currentIndex) => ({
	type: SET_CURRENT_TRACK,
	track,
	currentIndex,
});

export const setPlayStatus = playStatus => ({
	type: TOGGLE_PLAY_STATUS,
	playStatus,
});

export const playTrackOnClick = () => ({
	type: CLICK_TRACK_PLAY,
});

export const setNextTrack = track => ({
	type: SET_NEXT_TRACK,
	track,
});

export const setPreviousTrack = track => ({
	type: SET_PREVIOUS_TRACK,
	track,
});

export const resetPlayer = () => ({
	type: RESET_PLAYER,
});

export const streamNextTrack = track => ({
	type: STREAM_NEXT_TRACK,
	payload: track,
});

export const handleStream = track => dispatch => {
	const id = track.id;
	const projectedIndex = store
		.getState()
		.playlist.map(track => track.id)
		.indexOf(id);

	//a b c d
	//c
	if (
		track.id === store.getState().currentTrack.id &&
		track.stream_url !== undefined &&
		track.id !==
			store.getState().playlist[store.getState().currentIndex].track.id &&
		projectedIndex - 1 !== store.getState().currentIndex &&
		!track
	) {
		return;
	} else {
		dispatch(streamNextTrack(track));
	}
};

export const resetUser = () => ({
	type: RESET_USER,
});
