import {combineReducers} from 'redux';
import user from './user';
import errorMsgs from './errorMsgs';
import loadUser from './loadUser';
import playlist from './playlist';
import loadTracks from './loadTracks';
import currentTrack from './currentTrack';
import currentIndex from './currentIndex';
import playStatus from './playStatus';

export default combineReducers({
	user,
	loadUser,
	loadTracks,
	playlist,
	currentTrack,
	currentIndex,
	playStatus,
	errorMsgs,
});
