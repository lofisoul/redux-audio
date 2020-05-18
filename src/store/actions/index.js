export const START_LOADING_USER = 'START_LOADING';
export const FETCH_USER = 'FETCH_USER';
export const START_LOADING_TRACKS = 'START_LOADING_TRACKS';
export const FETCH_TRACKS = 'FETCH_TRACKS';
export const STORE_PLAYLIST = 'STORE_PLAYLIST';
export const SET_INITIAL_TRACK = 'SET_INITIAL_TRACK';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const PLAY_TRACK = 'PLAY_TRACK';
export const SET_NEXT_TRACK = 'SET_NEXT_TRACK';
export const SET_PREVIOUS_TRACK = 'SET_PREVIOUS_TRACK';
export const TOGGLE_PLAY_STATUS = 'TOGGLE_PLAY_STATUS';
export const CLICK_TRACK_PLAY = 'CLICK_TRACK_PLAY';

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
