import React, {useState} from 'react';
import {connect} from 'react-redux';
import {fetchUser, fetchTracks, resetUser} from './store/actions';
import styled from 'styled-components';
import StyledForm from './styled/StyledForm';
import {Button} from './styled';

const FormWrap = styled.div`
	border-radius: 7px;
	box-shadow: 5px 5px 0px 1px rgba(0, 0, 0, 0.5);
	padding: 20px;
	background: #fff;
	margin-bottom: 2rem;
	max-width: 470px;
	margin: 0 auto;
`;

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

const SCForm = ({
	fetchUser,
	fetchTracks,
	user,
	resetUser,
	loadTracks,
	loadUser,
}) => {
	const [username, setUsername] = useState('');
	const handleSubmit = e => {
		e.preventDefault();
		fetchTracks(username);
		setUsername('');
	};

	const handleRefetch = e => {
		fetchTracks(user.username);
	};

	const handleReset = e => {
		e.preventDefault();
		resetUser();
	};

	return (
		<>
			{!user && !loadUser && (
				<FormWrap>
					<h2>Discover new vibes</h2>
					<p>
						Enter a{' '}
						<i
							className="fab fa-soundcloud"
							style={{color: '#ff7700'}}
						></i>{' '}
						soundcloud username below to generate a playlist of
						likes from that user and users who liked those tracks.
						Find users who you vibe with and explore new tracks.
					</p>
					<StyledForm onSubmit={handleSubmit}>
						<input
							type="text"
							name="username"
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
						<Button type="submit">Launch</Button>
					</StyledForm>
				</FormWrap>
			)}
			{user && !loadTracks && (
				<ResetWrap>
					<Button type="button" onClick={handleReset}>
						Start Over
					</Button>
					<Button type="button" onClick={handleRefetch}>
						Refetch Playlist
					</Button>
				</ResetWrap>
			)}
		</>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user,
		loadTracks: state.loadTracks,
		loadUser: state.loadUser,
	};
};
const mapDispatchToProps = {fetchUser, fetchTracks, resetUser};

export default connect(mapStateToProps, mapDispatchToProps)(SCForm);
