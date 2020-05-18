import React from 'react';
import {connect} from 'react-redux';
import {
	setCurrentTrack,
	playTrackOnClick,
	setInitialTrack,
} from './store/actions';
import StyledTrack from './styled/StyledTrack';

const Track = ({
	track,
	index,
	currentTrack,
	setInitialTrack,
	setCurrentTrack,
	playlist,
	playStatus,
	playTrackOnClick,
	currentIndex,
}) => {
	const clickPlay = e => {
		const id = +e.currentTarget.parentNode.dataset.id;
		const newCurrentTrack = playlist.filter(track => track.id === id);
		const newCurrentIndex = playlist.map(track => track.id).indexOf(id);
		if (!currentTrack) {
			setInitialTrack(newCurrentTrack[0].track, newCurrentIndex);
			return;
		}
		if (currentTrack && id === currentTrack.id) {
			console.log(playStatus);
			playTrackOnClick();
		} else {
			setCurrentTrack(newCurrentTrack[0].track, newCurrentIndex);
		}
	};

	return (
		<StyledTrack data-id={track.id} index={index}>
			<div className="track-img" onClick={clickPlay}>
				<img src={track.artwork_url} alt={track.title} />
				{playStatus && currentIndex === index ? (
					<i className="fas fa-pause"></i>
				) : (
					<i className="fas fa-play"></i>
				)}
			</div>
			<div className="track-info">
				<label>{track.user.username}</label>
				<h3>{track.title}</h3>
				<ul className="track-stats">
					<li>
						<i className="fas fa-play"></i>
						<span>{track.playback_count}</span>
					</li>
					<li>
						<i className="fas fa-heart"></i>
						<span>{track.favoritings_count}</span>
					</li>
					<li>
						<i className="fas fa-retweet"></i>
						<span>{track.reposts_count}</span>
					</li>
					<li>
						<i className="fas fa-comment-alt"></i>
						<span>{track.comment_count}</span>
					</li>
				</ul>
			</div>
		</StyledTrack>
	);
};

const mapStateToProps = state => ({
	playlist: state.playlist,
	playStatus: state.playStatus,
	currentTrack: state.currentTrack,
	currentIndex: state.currentIndex,
});
const mapDispatchToProps = {setCurrentTrack, playTrackOnClick, setInitialTrack};

export default connect(mapStateToProps, mapDispatchToProps)(Track);
