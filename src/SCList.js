import React, {useState} from 'react';
import {connect} from 'react-redux';
import Track from './Track';
import UserInfo from './UserInfo';
import StyledList from './styled/StyledList';
import Loader from './styled/Loader';
import ResetBtns from './ResetBtns';
import PlaylistFilter from './PlaylistFilter';

const SCList = ({loadTracks, playlist, user}) => {
	const [filter, setFilter] = useState(0);
	const onChangeHandler = e => {
		setFilter(e.target.value);
	};
	return (
		<>
			{loadTracks && <Loader />}
			{user && !loadTracks && (
				<div>
					<ResetBtns />
				</div>
			)}
			{playlist && playlist.length > 0 && !loadTracks && user && (
				<StyledList>
					{playlist.map((item, index) =>
						item.id !== undefined ? (
							<li
								key={item.track.id}
								style={{'--animation-order': index + 1}}
							>
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
