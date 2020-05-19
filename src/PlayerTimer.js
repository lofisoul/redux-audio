import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import StyledTimer from './styled/StyledTimer';

const PlayerTimer = ({currentTrack, audio, playNextTrack}) => {
	// const [playerTime, setPlayerTime] = useState(null);

	useEffect(() => {
		if (audio) {
			audio.current.addEventListener('timeupdate', handleTimeUpdate);
			audio.current.addEventListener('timeupdate', handleProgress);
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
			let hours = Math.floor(time / 3600);
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

	const handleProgress = event => {
		if (!audio.current) return;
		const currentTime = Math.floor(event.target.currentTime);
		const duration = Math.trunc(audio.current.duration);

		const progressBar = document.getElementById('progress-bar');
		const scrubber = document.getElementById('progress-scrubber');
		//get the % of time / duration
		const progressDistance = (currentTime / duration) * 100;
		//modify width of progress
		progressBar.style.width = isNaN(progressDistance)
			? 0
			: progressDistance + '%';

		//modify left position of scrubber
		scrubber.style.left = isNaN(progressDistance)
			? 0
			: progressDistance + '%';
	};

	const clickScrubber = event => {
		if (!audio.current) return;
		const progressBar = document.getElementById('progress-bar');
		const scrubber = document.getElementById('progress-scrubber');
		const boundary = event.target.getBoundingClientRect();
		const xPos = Math.floor(event.clientX - boundary.left);
		console.log(xPos);
		console.log(event.target.offsetWidth);
		const progressDistance = xPos / event.target.offsetWidth;
		console.log(progressDistance);
		//move scrubber and progress
		progressBar.style.width = isNaN(progressDistance)
			? 0
			: progressDistance + '%';

		//modify left position of scrubber
		scrubber.style.left = isNaN(progressDistance)
			? 0
			: progressDistance + '%';
		//update audio
		audio.current.currentTime = progressDistance * audio.current.duration;
	};

	return (
		<StyledTimer>
			{currentTrack && (
				<>
					<div id="player-time-current"></div>
					<div id="player-timeline" onClick={clickScrubber}>
						<div className="timeline"></div>
						<div id="progress-bar"></div>
						<button id="progress-scrubber"></button>
					</div>
					<div id="player-time-duration"></div>
				</>
			)}
		</StyledTimer>
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
