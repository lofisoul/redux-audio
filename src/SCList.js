import React from 'react';
import {connect} from 'react-redux';
import Track from './Track';
import UserInfo from './UserInfo';
import {StyledList} from './styled';

const SCList = ({loadTracks, playlist, currentTrack}) => {
	return (
		<>
			{loadTracks && <div>Loading</div>}
			{playlist.length > 0 && !loadTracks && (
				<StyledList>
					{playlist.map((item, index) =>
						item.id !== undefined ? (
							<li key={item.track.id}>
								<UserInfo user={item.user} />
								<Track track={item.track} index={index} />
							</li>
						) : (
							''
						),
					)}
				</StyledList>
			)}
		</>
	);
};

const mapStateToProps = state => ({
	loadTracks: state.loadTracks,
	playlist: state.playlist,
	currentTrack: state.currentTrack,
});

export default connect(mapStateToProps)(SCList);
