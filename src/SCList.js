import React, {useState} from 'react';
import {connect} from 'react-redux';
import Track from './Track';
import UserInfo from './UserInfo';
import StyledList from './styled/StyledList';
import Loader from './styled/Loader';
import ResetBtns from './ResetBtns';
import PlaylistFilter from './PlaylistFilter';
import styled from 'styled-components';

const UtilityWrap = styled.div`
	padding-bottom: 2rem;
	justify-content: center;
	@media (min-width: 576px) {
		display: flex;
		justify-content: space-between;
		align-content: center;
	}
`;

const SCList = ({loadTracks, playlist, user}) => {
	const [filter, setFilter] = useState(null);
	const onChangeHandler = e => {
		let filterState = e.target.value === '0' ? null : e.target.value;
		setFilter(filterState);
	};
	const renderPlaylist = filter
		? playlist.filter(track => track.type === filter)
		: playlist;
	return (
		<>
			{loadTracks && <Loader />}
			{user && !loadTracks && (
				<UtilityWrap>
					<PlaylistFilter
						onChangeHandler={onChangeHandler}
						filter={filter}
					/>
					<ResetBtns />
				</UtilityWrap>
			)}
			{playlist && playlist.length > 0 && !loadTracks && user && (
				<StyledList>
					{renderPlaylist.map((item, index) =>
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
