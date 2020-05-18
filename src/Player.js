import React, {useEffect} from 'react';
import StyledPlayer from './styled/StyledPlayer';
import {connect} from 'react-redux';
import {setPlayStatus, setCurrentTrack} from './store/actions';

const Player = ({currentTrack, playStatus, setPlayStatus}) => {
	const audioRef = React.useRef();
	let mounted = React.useRef(false);

	useEffect(() => {
		if (mounted.current) {
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

	return (
		<StyledPlayer currentTrack={currentTrack}>
			{currentTrack && (
				<div>
					{currentTrack.title}
					<button onClick={playTrack}>
						{playStatus ? 'Pause' : 'Play'}
					</button>
					<audio
						src={`${currentTrack.stream_url}?client_id=aa43f640526cb3f753a3a2ce40a340b4`}
						ref={audioRef}
					/>
				</div>
			)}
		</StyledPlayer>
	);
};

const mapStateToProps = state => ({
	currentTrack: state.currentTrack,
	playStatus: state.playStatus,
});

const mapDispatchToProps = {setPlayStatus};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
