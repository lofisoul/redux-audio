import React, {useEffect, useRef} from 'react';
import StyledPlayer from './styled/StyledPlayer';
import PlayerTimer from './PlayerTimer';
import PlayerControls from './PlayerControls';
import PlayerInfo from './PlayerInfo';
import {connect} from 'react-redux';
import {
	setPlayStatus,
	setPreviousTrack,
	setNextTrack,
	resetPlayer,
} from './store/actions';

const Player = ({
	playlist,
	currentTrack,
	currentIndex,
	playStatus,
	setPlayStatus,
	setNextTrack,
	setPreviousTrack,
	resetPlayer,
}) => {
	const audioRef = useRef();
	let mounted = useRef(false);

	//Component Side Effects on Outside Events
	useEffect(() => {
		if (mounted.current && currentTrack) {
			togglePlayStatus(playStatus);
		} else {
			mounted.current = true;
		}
	});

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
			console.log('dispatch reset!');
			resetPlayer();
		} else {
			let nextIndex = currentIndex + 1;
			console.log(nextIndex);
			let nextTrack = playlist[nextIndex].track;
			console.log(nextTrack);
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

	return (
		<StyledPlayer currentTrack={currentTrack}>
			{currentTrack && (
				<>
					<div>
						<PlayerControls
							playTrack={playTrack}
							playPreviousTrack={playPreviousTrack}
							playNextTrack={playNextTrack}
						/>
						<PlayerTimer
							audio={audioRef}
							playNextTrack={playNextTrack}
						></PlayerTimer>
						<PlayerInfo />
					</div>
					<audio
						src={`${currentTrack.stream_url}?client_id=${process.env.REACT_APP_SC_ID}`}
						ref={audioRef}
					/>
				</>
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
	resetPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
