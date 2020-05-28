import React, {Component, createRef} from 'react';
import StyledPlayer from './styled/StyledPlayer';
import PlayerControls from './PlayerControls';
import PlayerInfo from './PlayerInfo';
import StyledTimer from './styled/StyledTimer';
import {connect} from 'react-redux';
import {
	setPlayStatus,
	setPreviousTrack,
	setNextTrack,
	resetPlayer,
	handleStream,
} from './store/actions';

class Player extends Component {
	constructor(props) {
		super(props);
		this.audio = createRef();
	}

	componentDidMount = () => {
		document.addEventListener('keydown', this.onSpacebar, false);
	};

	componentDidUpdate = () => {
		if (this.props.currentTrack) {
			this.togglePlayStatus(this.props.playStatus);
			this.audio.current.addEventListener(
				'ended',
				this.props.playNextTrack,
			);
			this.audio.current.addEventListener(
				'timeupdate',
				this.handleTimeUpdate,
			);
			this.audio.current.addEventListener(
				'timeupdate',
				this.handleProgress,
			);
			this.audio.current.addEventListener('ended', this.handleNextTrack);
		}
	};

	playTrack = e => {
		this.props.setPlayStatus(this.props.playStatus);
		return false;
	};

	onSpacebar = e => {
		if (this.audio.current && e.keyCode === 32) {
			e.preventDefault();
			this.props.setPlayStatus(this.props.playStatus);
			return false;
		}
	};

	togglePlayStatus = playStatus => {
		if (this.audio.current && playStatus) {
			this.audio.current.play();
		} else if (this.audio.current && !playStatus) {
			this.audio.current.pause();
		} else {
			return;
		}
	};

	playNextTrack = () => {
		if (this.props.currentIndex === this.props.playlist.length - 1) {
			this.props.resetPlayer();
		} else {
			let nextIndex = this.props.currentIndex + 1;
			let nextTrack = this.props.playlist[nextIndex].track;
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

	handleNextTrack = () => {
		if (this.props.currentIndex === this.props.playlist.length - 1) {
			this.props.resetPlayer();
		} else {
			const nextIndex = this.props.currentIndex + 1;
			const nextTrack = this.props.playlist[nextIndex].track;
			this.props.handleStream(nextTrack);
		}
	};

	padZero = n => {
		return n < 10 ? '0' + n : n;
	};

	secondsToTime = time => {
		if (time < 3600) {
			let minutes = Math.floor(time / 60);
			let seconds = this.padZero(Math.floor(time % 60));
			return `${minutes}:${seconds}`;
		} else {
			let hours = Math.floor(time / 3600);
			let minutes = this.padZero(Math.floor((time - hours * 3600) / 60));
			let seconds = this.padZero(Math.floor(time % 60));
			return `${hours}:${minutes}:${seconds}`;
		}
	};

	handleTimeUpdate = event => {
		if (!this.audio.current) return;
		const currentTimeEl = document.getElementById('player-time-current');
		const durationTimeEl = document.getElementById('player-time-duration');
		const timeInSeconds = Math.floor(event.target.currentTime);
		const duration = isNaN(Math.trunc(this.audio.current.duration))
			? ''
			: Math.trunc(this.audio.current.duration);
		const timeObj = {
			currentTime: this.secondsToTime(timeInSeconds),
			duration: this.secondsToTime(duration),
		};

		currentTimeEl.textContent = timeObj
			? `${timeObj.currentTime}`
			: `Loading`;
		durationTimeEl.textContent = timeObj
			? `${timeObj.duration}`
			: `Loading`;

		// if (audio.current.currentTime >= audio.current.duration) {
		// 	handleNextTrack();
		// }
	};

	handleProgress = event => {
		if (!this.audio.current) return;
		const currentTime = Math.floor(event.target.currentTime);
		const duration = Math.trunc(this.audio.current.duration);

		const progressBar = document.getElementById('progress-bar');
		const scrubber = document.getElementById('progress-scrubber');
		//get the % of time / duration
		const progressDistance = (currentTime / duration) * 100;
		//modify width of progress
		progressBar.style.width = isNaN(progressDistance)
			? 0
			: progressDistance + '%';

		//modify left position of scrubber
		scrubber.style.left = isNaN(progressDistance)
			? 0
			: progressDistance + '%';
	};

	clickScrubber = event => {
		if (!this.audio.current) return;
		// console.log('click the scrubber');
		const progressBar = document.getElementById('progress-bar');
		const scrubber = document.getElementById('progress-scrubber');
		const boundary = event.target.getBoundingClientRect();
		const xPos = Math.floor(event.clientX - boundary.left);
		// console.log(xPos);
		// console.log(event.target.offsetWidth);
		const progressDistance = xPos / event.target.offsetWidth;
		// console.log(progressDistance);
		//move scrubber and progress
		progressBar.style.width = isNaN(progressDistance)
			? 0
			: progressDistance + '%';

		//modify left position of scrubber
		scrubber.style.left = isNaN(progressDistance)
			? 0
			: progressDistance + '%';
		//update audio
		this.audio.current.currentTime =
			progressDistance * this.audio.current.duration;
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
							<StyledTimer>
								{this.props.currentTrack && (
									<>
										<div id="player-time-current"></div>
										<div
											id="player-timeline"
											onClick={this.clickScrubber}
										>
											<div className="timeline"></div>

											<div id="progress-bar"></div>
											<button
												id="progress-scrubber"
												className="handle"
											></button>
										</div>

										<div id="player-time-duration"></div>
									</>
								)}
							</StyledTimer>
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
	handleStream,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
