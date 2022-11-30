import store from './store';
import {handleUserFetchError, handleTrackFetchError} from './store/actions';

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

export const playlistSize = 5;

const api = {
	//function to resolve soundcloud user
	async fetchUser(user, authToken) {
		try {
			const userToResolve = await fetch(
				`https://api.soundcloud.com/resolve?url=https://soundcloud.com/${user}`,
				{
					headers: {
						Accept: '*/*',
						Authorization: `OAuth ${authToken}`,
					},
				},
			)
				.then(res => res.json())
				.then(data => data);
			return userToResolve;
		} catch (err) {
			const errorMsg =
				err.status === 404
					? `Whoops! That user doesn't exist or you don't have sufficient authority to access those likes! If you think this is wrong, try the username in the URL of your Soundcloud profile page.`
					: err.message;
			store.dispatch(handleUserFetchError(errorMsg));
			return;
		}
	},
	async getUserFaves(userId, authToken) {
		if (userId === null) {
			return;
		}
		try {
			return await fetch(
				`https://api.soundcloud.com/users/${userId}/likes/tracks`,
				{
					headers: {
						Accept: '*/*',
						Authorization: `OAuth ${authToken}`,
					},
					limit: 1000,
					linked_partitioning: 1,
				},
			)
				.then(res => res.json())
				.then(data => {
					return data;
				});
			// console.log('FAVORITES ' + favorites)
			// console.log('FAVORITES ' + JSON.stringify(favorites))
			// return favorites;
		} catch (err) {
			return err;
		}
	},
	async generateRandomPlaylist(track, sessionUser, authToken) {
		try {
			const usersWhoLiked = await fetch(
				`https://api.soundcloud.com/tracks/${track.id}/favoriters`,
				{
					headers: {
						Accept: '*/*',
						Authorization: `OAuth ${authToken}`,
					},
					limit: 1000,
					linked_partitioning: 1,
				},
			)
				.then(res => res.json())
				.then(data => data);
			let userArr = usersWhoLiked;
			const arrayUsersFaves = userArr.filter(
				user =>
					user.public_favorites_count > 1 &&
					user.username !== sessionUser.username,
			);

			let randomUser = shuffle(arrayUsersFaves, 1)[0];
			//ERROR WILL HAPPEN HERE --> error status === 0
			//this variable will be undefined
			let userFaves = await this.getUserFaves(
				randomUser.id,
				localStorage.accessToken,
			);
			let randomTrack = shuffle(userFaves, 1)[0];

			//handling same error issue
			while (randomTrack.id === track.id) {
				randomTrack = shuffle(userFaves, 1)[0];
			}
			//handling issue of non-streamable track
			while (randomTrack.streamable === false) {
				randomTrack = shuffle(userFaves.collection, 1)[0];
			}

			//get audioSrc
			const trackAudioSrc = await fetch(`${track.stream_url}s`, {
				headers: {
					Accept: 'application/json; charset=utf-8',
					Authorization: `OAuth ${localStorage.accessToken}`,
				},
			})
				.then(res => res.json())
				.then(data => data.http_mp3_128_url);

			const randomTrackAudioSrc = await fetch(
				`${randomTrack.stream_url}s`,
				{
					headers: {
						Accept: 'application/json; charset=utf-8',
						Authorization: `OAuth ${localStorage.accessToken}`,
					},
				},
			)
				.then(res => res.json())
				.then(data => data.http_mp3_128_url);

			let randomArr = [];
			const userFave = {
				user: sessionUser,
				track: {audioSrc: trackAudioSrc, ...track},
				type: 'user',
				id: track.id,
				partnerId: randomTrack.id,
			};
			const referral = {
				user: randomUser,
				track: {audioSrc: randomTrackAudioSrc, ...randomTrack},
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
	async createPlaylist(user, authToken) {
		try {
			const userFaves = await this.getUserFaves(user.id, authToken);
			const filteredTracks = userFaves.filter(track => track.streamable);
			const sortedTracks = shuffle(filteredTracks, playlistSize);
			//run logic for getting random song based on users that liked 5 sorted tracks
			if (userFaves.length < 10) {
				const errorMsg = `That user doesn't have enough likes to generate a playlist. Try again with a different username.`;
				store.dispatch(handleTrackFetchError(errorMsg));
				return null;
			}
			let randomPlaylist = await Promise.all(
				sortedTracks.map(async (item, index) => {
					let newItem = await this.generateRandomPlaylist(
						item,
						user,
						authToken,
					);

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
	async fetchTrack(id, authToken) {
		try {
			let track = await fetch(`https://api.soundcloud.com/tracks/${id}`, {
				headers: {
					Accept: '*/*',
					Authorization: `OAuth ${authToken}`,
				},
			})
				.then(res => res.json())
				.then(data => data);
			return track;
		} catch (err) {
			return err;
		}
	},
};

export const demoUsers = [
	'lofisoul',
	'soundcloud-shine',
	'soundcloud-vibrations',
	'soundcloud-scenes',
	'soundcloud-hustle',
	'soundcloud-circuits',
	'soundcloud-the-peak',
	'soundcloud-auras',
	'soundcloud-vs',
	'diplo',
	'doandroidsdance',
	'soulection',
];

export default api;
