import SC from 'soundcloud';
import store from './store';
import {handleUserFetchError, handleTrackFetchError} from './store/actions';

SC.initialize({
	client_id: process.env.REACT_APP_SC_ID,
});

export const shuffle = (arr, n) => {
	let currentIndex = arr.length,
		randomIndex,
		tempValue;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		tempValue = arr[currentIndex];
		arr[currentIndex] = arr[randomIndex];
		arr[randomIndex] = tempValue;
	}

	return arr.slice(0, n);
};

const playlistSize = 10;

const api = {
	//function to resolve soundcloud user
	async fetchUser(user) {
		try {
			const userToResolve = await SC.resolve(
				`https://soundcloud.com/${user}`,
			);
			return userToResolve;
		} catch (err) {
			const errorMsg =
				err.status === 404
					? `Whoops! That user doesn't exist or you don't have sufficient authority to access those likes! If you think this is wrong, try the username in the URL of your profile page.`
					: err.message;
			store.dispatch(handleUserFetchError(errorMsg));
			return;
		}
	},
	async getUserFaves(userId) {
		if (userId === null) {
			return;
		}
		try {
			const favorites = await SC.get(`/users/${userId}/favorites`, {
				limit: 1000,
				linked_partitioning: 1,
			});

			return favorites;
		} catch (err) {
			return err;
		}
	},
	async generateRandomPlaylist(track, sessionUser) {
		try {
			const usersWhoLiked = await SC.get(
				`/tracks/${track.id}/favoriters`,
				{
					limit: 1000,
					linked_partitioning: 1,
				},
			);

			let userArr = usersWhoLiked.collection;
			const arrayUsersFaves = userArr.filter(
				user =>
					user.public_favorites_count > 1 &&
					user.username !== sessionUser.username,
			);

			let randomUser = shuffle(arrayUsersFaves, 1)[0];
			//ERROR WILL HAPPEN HERE --> error status === 0
			//this variable will be undefined
			let userFaves = await this.getUserFaves(randomUser.id);
			let randomTrack = shuffle(userFaves.collection, 1)[0];
			//handling same error issue
			while (randomTrack.id === track.id) {
				randomTrack = shuffle(userFaves.collection, 1)[0];
			}
			//handling issue of non-streamable track
			while (randomTrack.streamable === false) {
				randomTrack = shuffle(userFaves.collection, 1)[0];
			}

			let randomArr = [];
			const userFave = {
				user: sessionUser,
				track: track,
				type: 'user',
				id: track.id,
				partnerId: randomTrack.id,
			};
			const referral = {
				user: randomUser,
				track: randomTrack,
				type: 'referral',
				id: randomTrack.id,
				partnerId: track.id,
			};
			randomArr.push(userFave, referral);
			return randomArr;
		} catch (err) {
			return err;
		}
	},
	async createPlaylist(user) {
		console.log(user);
		try {
			const userFaves = await this.getUserFaves(user.id);
			const filteredTracks = userFaves.collection.filter(
				track => track.streamable,
			);
			console.log(userFaves.collection);
			const sortedTracks = shuffle(filteredTracks, playlistSize);
			//run logic for getting random song based on users that liked 5 sorted tracks
			if (userFaves.collection.length < 10) {
				const errorMsg = `That user doesn't have enough likes to generate a playlist. Try again with a different username.`;
				store.dispatch(handleTrackFetchError(errorMsg));
				return null;
			}
			let randomPlaylist = await Promise.all(
				sortedTracks.map(async (item, index) => {
					let newItem = await this.generateRandomPlaylist(item, user);

					return newItem;
				}),
			);
			let playlist = [].concat.apply([], randomPlaylist);
			if (playlist.length !== 20) {
				//console.log('YIKES playlist is junked!' + playlist);
				// let newFilter = arrayUsersFaves.filter.map(
				// 	user => user.id !== randomUser.id,
				// );
				// return;
			}
			// const playList = randomPlaylist;
			//console.log(playlist);
			return playlist;
		} catch (err) {
			return err;
		}
	},
	async fetchTrack(id) {
		try {
			let track = await SC.get(`/tracks/${id}`);
			return track;
		} catch (err) {
			return err;
		}
	},
};

export const demoUsers = [
	'soundcloud-shine',
	'soundcloud-vibrations',
	'diplo',
	'doandroidsdance',
	'soulection',
];

export default api;
