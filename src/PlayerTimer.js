import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {setNextTrack} from './store/actions';

const PlayerTimer = ({
	currentTrack,
	audio,
	playNextTrack,
	playlist,
	currentIndex,
	setNextTrack,
}) => {
	// const [playerTime, setPlayerTime] = useState(null);

	useEffect(() => {
		if (audio) {
			audio.current.addEventListener('timeupdate', handleTimeUpdate);
		}
	});

	const handleTimeUpdate = event => {
		if (!audio.current) return;
		const timeEl = document.getElementById('player-time');
		const timeInSeconds = Math.floor(event.target.currentTime);
		const duration = isNaN(Math.trunc(audio.current.duration))
			? ''
			: Math.trunc(audio.current.duration);
		const timeObj = {
			currentTime: timeInSeconds,
			duration,
		};
		console.log(timeObj);
		if (timeObj.currentTime === timeObj.duration) {
			playNextTrack();
		}
		timeEl.textContent = `${timeObj.currentTime}`;
	};

	return <div>{currentTrack && <div id="player-time"></div>}</div>;
};

const mapStateToProps = state => ({
	currentTrack: state.currentTrack,
	playlist: state.playlist,
	currentIndex: state.currentIndex,
});

const mapDispatchToProps = {setNextTrack};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTimer);
