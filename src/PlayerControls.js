import React from 'react';
import StyledPlayerControls from './styled/StyledPlayerControls';
import {connect} from 'react-redux';

const PlayerControls = ({
	playTrack,
	playPreviousTrack,
	playNextTrack,
	currentIndex,
	playlist,
	playStatus,
}) => {
	return (
		<StyledPlayerControls>
			<button onClick={playPreviousTrack} disabled={currentIndex === 0}>
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
		</StyledPlayerControls>
	);
};

const mapStateToProps = state => ({
	playStatus: state.playStatus,
	currentIndex: state.currentIndex,
	playlist: state.playlist,
});

export default connect(mapStateToProps)(PlayerControls);
