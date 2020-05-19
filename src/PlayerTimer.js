import React, {useEffect} from 'react';
import {connect} from 'react-redux';
//import {setNextTrack, setPlayStatus} from './store/actions';

const PlayerTimer = ({currentTrack, audio, playNextTrack}) => {
	// const [playerTime, setPlayerTime] = useState(null);

	useEffect(() => {
		if (audio) {
			audio.current.addEventListener('timeupdate', handleTimeUpdate);
		}
	});

	const padZero = n => {
		return n < 10 ? '0' + n : n;
	};
	const secondsToTime = time => {
		if (time < 3600) {
			let minutes = Math.floor(time / 60);
			let seconds = padZero(Math.floor(time % 60));
			return `${minutes}:${seconds}`;
		} else {
			let hours = Math.floor(time % 3600);
			let minutes = padZero(Math.floor((time - hours * 3600) / 60));
			let seconds = padZero(Math.floor(time % 60));
			return `${hours}:${minutes}:${seconds}`;
		}
	};

	const handleTimeUpdate = event => {
		if (!audio.current) return;
		const currentTimeEl = document.getElementById('player-time-current');
		const durationTimeEl = document.getElementById('player-time-duration');
		const timeInSeconds = Math.floor(event.target.currentTime);
		const duration = isNaN(Math.trunc(audio.current.duration))
			? ''
			: Math.trunc(audio.current.duration);
		const timeObj = {
			currentTime: secondsToTime(timeInSeconds),
			duration: secondsToTime(duration),
		};

		if (timeInSeconds === duration) {
			playNextTrack();
		}
		currentTimeEl.textContent = timeObj
			? `${timeObj.currentTime}`
			: `Loading`;
		durationTimeEl.textContent = timeObj
			? `${timeObj.duration}`
			: `Loading`;
	};

	return (
		<div>
			{currentTrack && (
				<div>
					<div id="player-time-current"></div>
					<div id="progress-bar"></div>
					<div id="player-time-duration"></div>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => ({
	currentTrack: state.currentTrack,
	// playlist: state.playlist,
	// currentIndex: state.currentIndex,
	// playStatus: state.playStatus,
});

//const mapDispatchToProps = {setNextTrack, setPlayStatus};

export default connect(mapStateToProps)(PlayerTimer);
