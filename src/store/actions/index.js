export const START_LOADING_USER = 'START_LOADING';
export const FETCH_USER = 'FETCH_USER';
export const START_LOADING_TRACKS = 'START_LOADING_TRACKS';
export const FETCH_TRACKS = 'FETCH_TRACKS';
export const STORE_PLAYLIST = 'STORE_PLAYLIST';
export const SET_DEFAULT_CURRENT_TRACK = 'SET_DEFAULT_CURRENT_TRACK';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const PLAY_TRACK = 'PLAY_TRACK';
export const INCREMENT_PLAYLIST = 'INCREMENT_PLAYLIST';
export const DECREMENT_PLAYLIST = 'DECREMENT_PLAYLIST';
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
	api.createPlaylist(username)
		.then(playlist => {
			dispatch(storeTracks(playlist));
			return playlist;
		})
		.then(playlist => {
			console.log(playlist);
			dispatch(setDefaultTrack(playlist));
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

export const setDefaultTrack = playlist => ({
	type: SET_DEFAULT_CURRENT_TRACK,
	currentTrack: playlist[0],
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
