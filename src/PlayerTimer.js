import React from 'react';
import {connect} from 'react-redux';

const PlayerTimer = ({currentTrack}) => {
	return (
		<div>
			{currentTrack && <div>Player Timer! {currentTrack.duration}</div>}
		</div>
	);
};

const mapStateToProps = state => ({
	currentTrack: state.currentTrack,
});

export default connect(mapStateToProps)(PlayerTimer);
