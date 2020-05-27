import React from 'react';
import {connect} from 'react-redux';
import Track from './Track';
import UserInfo from './UserInfo';
import StyledList from './styled/StyledList';
import Loader from './styled/Loader';

const SCList = ({loadTracks, playlist, user}) => {
	return (
		<>
			{loadTracks && <Loader />}
			{playlist.length > 0 && !loadTracks && user && (
				<StyledList>
					{playlist.map((item, index) =>
						item.id !== undefined ? (
							<li key={item.track.id}>
								<UserInfo user={item.user} index={index} />
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
	user: state.user,
});

export default connect(mapStateToProps)(SCList);
