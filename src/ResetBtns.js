import React from 'react';
import {connect} from 'react-redux';
import {fetchTracks, resetUser, clearErrors} from './store/actions';
import {Button} from './styled';
import styled from 'styled-components';

const ResetWrap = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin-bottom: 2rem;
	& button {
		padding: 1rem;
		cursor: pointer;
	}
	@media (min-width: 576px) {
		justify-content: flex-end;
		& button {
			margin-left: 1rem;
		}
	}
`;

const ResetBtns = ({user, fetchTracks, resetUser, clearErrors}) => {
	const handleRefetch = e => {
		fetchTracks(user.username);
	};

	const handleReset = e => {
		e.preventDefault();
		resetUser();
		clearErrors();
	};

	return (
		<ResetWrap>
			<Button type="button" onClick={handleReset}>
				Start Over
			</Button>
			<Button type="button" onClick={handleRefetch}>
				Refetch Playlist
			</Button>
		</ResetWrap>
	);
};

const mapStateToProps = state => ({
	user: state.user,
	loadTracks: state.loadTracks,
});
const mapDispatchToProps = {fetchTracks, resetUser, clearErrors};

export default connect(mapStateToProps, mapDispatchToProps)(ResetBtns);
