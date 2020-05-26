import React from 'react';
import {connect} from 'react-redux';
import StyledPlayerInfo from './styled/StyledPlayerInfo';

const PlayerInfo = ({currentTrack}) => {
	return (
		<StyledPlayerInfo>
			<div className="track-img">
				{currentTrack.artwork_url ? (
					<img
						src={currentTrack.artwork_url}
						alt={currentTrack.title}
					/>
				) : (
					<img
						src="https://gradientjoy.com/200?id=229"
						alt={currentTrack.title}
					/>
				)}
			</div>
			<div className="track-info">
				<label>{currentTrack.user.username}</label>
				{currentTrack.title}
			</div>
		</StyledPlayerInfo>
	);
};

const mapStateToProps = state => ({
	currentTrack: state.currentTrack,
});

export default connect(mapStateToProps)(PlayerInfo);
