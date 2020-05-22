import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import StyledTimer from './styled/StyledTimer';
import {resetPlayer, handleStream} from './store/actions';

const PlayerTimer = ({
	currentTrack,
	audio,
	playlist,
	currentIndex,
	resetPlayer,
	handleStream,
}) => {
	// const [playerTime, setPlayerTime] = useState(null);
	let mounted = useRef(false);
	useEffect(() => {
		if (mounted && currentTrack) {
			audio.current.addEventListener('timeupdate', handleTimeUpdate);
			audio.current.addEventListener('timeupdate', handleProgress);
			audio.current.addEventListener('ended', () => {
				handleNextTrack();
				audio.current.load();
				audio.current.play();
			});
		}
	});

	const handleNextTrack = () => {
		if (currentIndex === playlist.length - 1) {
			console.log('dispatch reset!');
			resetPlayer();
		} else {
			const nextIndex = currentIndex + 1;
			const nextTrack = playlist[nextIndex].track;
			handleStream(nextTrack);
		}
	};

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

		currentTimeEl.textContent = timeObj
			? `${timeObj.currentTime}`
			: `Loading`;
		durationTimeEl.textContent = timeObj
			? `${timeObj.duration}`
			: `Loading`;

		// if (audio.current.currentTime >= audio.current.duration) {
		// 	handleNextTrack();
		// }
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
		// console.log('click the scrubber');
		const progressBar = document.getElementById('progress-bar');
		const scrubber = document.getElementById('progress-scrubber');
		const boundary = event.target.getBoundingClientRect();
		const xPos = Math.floor(event.clientX - boundary.left);
		// console.log(xPos);
		// console.log(event.target.offsetWidth);
		const progressDistance = xPos / event.target.offsetWidth;
		// console.log(progressDistance);
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
						<button
							id="progress-scrubber"
							className="handle"
						></button>
					</div>

					<div id="player-time-duration"></div>
				</>
			)}
		</StyledTimer>
	);
};

const mapStateToProps = state => ({
	currentTrack: state.currentTrack,
	playlist: state.playlist,
	currentIndex: state.currentIndex,
});

const mapDispatchToProps = {handleStream, resetPlayer};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTimer);
