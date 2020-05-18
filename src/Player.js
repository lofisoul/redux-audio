import React, {useEffect, useRef} from 'react';
import StyledPlayer from './styled/StyledPlayer';
import PlayerTimer from './PlayerTimer';
import {connect} from 'react-redux';
import {setPlayStatus, setPreviousTrack, setNextTrack} from './store/actions';

const Player = ({
	playlist,
	currentTrack,
	currentIndex,
	playStatus,
	setPlayStatus,
	setNextTrack,
	setPreviousTrack,
}) => {
	const audioRef = useRef();
	let mounted = useRef(false);

	//Component Side Effects on Outside Events
	useEffect(() => {
		if (mounted.current && currentTrack) {
			console.log(`toggle ${playStatus}`);
			togglePlayStatus(playStatus);
			if (playStatus) {
				audioRef.current.addEventListener(
					'timeupdate',
					handleTimeUpdate,
				);
			}
		} else {
			mounted.current = true;
		}
	});

	useEffect(() => {});

	const playTrack = e => {
		setPlayStatus(playStatus);
	};

	const togglePlayStatus = playStatus => {
		if (playStatus) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	};

	const playNextTrack = () => {
		if (currentIndex === playlist.length - 1) {
			return;
		} else {
			let nextIndex = currentIndex + 1;
			let nextTrack = playlist[nextIndex].track;
			setNextTrack(nextTrack);
		}
	};

	const playPreviousTrack = () => {
		if (currentIndex === 0) {
			return;
		} else {
			let previousIndex = currentIndex - 1;
			let previousTrack = playlist[previousIndex].track;
			setPreviousTrack(previousTrack);
		}
	};

	const handleTimeUpdate = event => {
		if (!audioRef.current) return;
		const timeInSeconds = Math.floor(event.target.currentTime);
		const duration = isNaN(Math.trunc(audioRef.current.duration))
			? ''
			: Math.trunc(audioRef.current.duration);
		const timeObj = {
			timeInSeconds,
			duration,
		};
		console.log(timeObj);
		return timeObj;
	};

	return (
		<StyledPlayer currentTrack={currentTrack}>
			{currentTrack && (
				<div>
					<PlayerTimer></PlayerTimer>
					<div className="player-info">{currentTrack.title}</div>

					<button
						onClick={playPreviousTrack}
						disabled={currentIndex === 0}
					>
						<i className="fas fa-step-backward"></i>
					</button>
					<button onClick={playTrack}>
						{playStatus ? (
							<i className="fas fa-pause"></i>
						) : (
							<i className="fas fa-play"></i>
						)}
					</button>
					<button
						onClick={playNextTrack}
						disabled={currentIndex === playlist.length - 1}
					>
						<i className="fas fa-step-forward"></i>
					</button>
					<audio
						src={`${currentTrack.stream_url}?client_id=${process.env.REACT_APP_SC_ID}`}
						ref={audioRef}
					/>
				</div>
			)}
		</StyledPlayer>
	);
};

const mapStateToProps = state => ({
	playlist: state.playlist,
	currentTrack: state.currentTrack,
	playStatus: state.playStatus,
	currentIndex: state.currentIndex,
});

const mapDispatchToProps = {
	setPlayStatus,
	setNextTrack,
	setPreviousTrack,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
