import React, {Component, createRef} from 'react';
import StyledPlayer from './styled/StyledPlayer';
import PlayerTimer from './PlayerTimer';
import PlayerControls from './PlayerControls';
import PlayerInfo from './PlayerInfo';
import {connect} from 'react-redux';
import {
	setPlayStatus,
	setPreviousTrack,
	setNextTrack,
	resetPlayer,
} from './store/actions';

class Player extends Component {
	constructor(props) {
		super(props);
		this.audio = createRef();
	}

	componentDidUpdate = () => {
		if (this.props.currentTrack) {
			this.togglePlayStatus(this.props.playStatus);
			this.audio.current.addEventListener(
				'ended',
				this.props.playNextTrack,
			);
		}
	};

	playTrack = e => {
		this.props.setPlayStatus(this.props.playStatus);
	};

	togglePlayStatus = playStatus => {
		if (playStatus && this.audio.current) {
			this.audio.current.play();
		} else {
			this.audio.current.pause();
		}
	};

	playNextTrack = () => {
		if (this.props.currentIndex === this.props.playlist.length - 1) {
			console.log('dispatch reset!');
			this.props.resetPlayer();
		} else {
			console.log(this.props.currentIndex);
			let nextIndex = this.props.currentIndex + 1;
			console.log(nextIndex);
			let nextTrack = this.props.playlist[nextIndex].track;
			console.log(nextTrack);
			this.props.setNextTrack(nextTrack);
		}
	};

	playPreviousTrack = () => {
		if (this.props.currentIndex === 0) {
			return;
		} else {
			let previousIndex = this.props.currentIndex - 1;
			let previousTrack = this.props.playlist[previousIndex].track;
			this.props.setPreviousTrack(previousTrack);
		}
	};

	render = () => {
		return (
			<StyledPlayer currentTrack={this.props.currentTrack}>
				{this.props.currentTrack && (
					<>
						<div>
							<PlayerControls
								playTrack={this.playTrack}
								playPreviousTrack={this.playPreviousTrack}
								playNextTrack={this.playNextTrack}
							/>
							<PlayerTimer audio={this.audio}></PlayerTimer>
							<PlayerInfo />
						</div>
						<audio
							src={`${this.props.currentTrack.stream_url}?client_id=${process.env.REACT_APP_SC_ID}`}
							ref={this.audio}
						/>
					</>
				)}
			</StyledPlayer>
		);
	};
}

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
	resetPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
