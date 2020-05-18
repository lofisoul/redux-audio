import React from 'react';
import {connect} from 'react-redux';

const PlayerTimer = ({currentTrack}) => {
	return <div>{currentTrack && <div>TIME STAMP!</div>}</div>;
};

const mapStateToProps = state => ({
	currentTrack: state.currentTrack,
});

export default connect(mapStateToProps)(PlayerTimer);
