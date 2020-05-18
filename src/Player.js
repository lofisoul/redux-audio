import React, {useEffect} from 'react';
import StyledPlayer from './styled/StyledPlayer';
import {connect} from 'react-redux';
import {
	setPlayStatus,
	setPreviousTrack,
	setNextTrack,
	setCurrentTrack,
} from './store/actions';

const Player = ({
	playlist,
	currentTrack,
	currentIndex,
	playStatus,
	setPlayStatus,
	setNextTrack,
	setPreviousTrack,
}) => {
	const audioRef = React.useRef();
	let mounted = React.useRef(false);

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
		let nextIndex = currentIndex + 1;
		let nextTrack = playlist[nextIndex].track;
		setNextTrack(nextTrack);
	};

	const playPreviousTrack = () => {
		let previousIndex = currentIndex - 1;
		let previousTrack = playlist[previousIndex].track;
		setPreviousTrack(previousTrack);
	};

	return (
		<StyledPlayer currentTrack={currentTrack}>
			{currentTrack && (
				<div>
					{currentTrack.title}
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
	setCurrentTrack,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
