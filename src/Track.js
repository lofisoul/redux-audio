import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {setCurrentTrack, playTrackOnClick} from './store/actions';
import StyledTrack from './styled/StyledTrack';

const Track = ({
	track,
	index,
	currentTrack,
	setCurrentTrack,
	playlist,
	playStatus,
	playTrackOnClick,
	currentIndex,
}) => {
	const [isActive, setActive] = useState(false);
	// const mounted = useRef(false);
	// useEffect(() => {
	// 	if (mounted.current) {
	// 		if(isPlaying && currentTrack) {
	// 			let id = currentTrack
	// 		}
	// 	} else {
	// 		mounted.current = true;
	// 	}
	// });

	const clickPlay = e => {
		const id = +e.currentTarget.parentNode.dataset.id;
		const currentTrack = playlist.filter(track => track.id === id);
		const currentIndex = playlist.map(track => track.id).indexOf(id);
		setCurrentTrack(currentTrack[0].track, currentIndex);
		playTrackOnClick();
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
const mapDispatchToProps = {setCurrentTrack, playTrackOnClick};

export default connect(mapStateToProps, mapDispatchToProps)(Track);
