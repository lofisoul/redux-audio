import React from 'react';
import {connect} from 'react-redux';

const PlayerInfo = ({currentTrack}) => {
	return <div>{currentTrack.title}</div>;
};

const mapStateToProps = state => ({
	currentTrack: state.currentTrack,
});

export default connect(mapStateToProps)(PlayerInfo);
