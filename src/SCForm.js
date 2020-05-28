import React, {useState} from 'react';
import {connect} from 'react-redux';
import {fetchUser, fetchTracks, resetUser, clearErrors} from './store/actions';
import styled from 'styled-components';
import StyledForm from './styled/StyledForm';
import {Button} from './styled';
import {demoUsers} from './sc-api';

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

const StyledAltLink = styled.a`
	font-style: italic;
	text-decoration: none;
	font-size: 1.2rem;
	display: block;
	margin: 1rem 0;
	color: #222;
	&:hover {
		color: #0e317d;
	}
`;

const SCForm = ({
	fetchUser,
	fetchTracks,
	user,
	resetUser,
	loadTracks,
	loadUser,
	clearErrors,
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
		clearErrors();
	};

	const launchDemo = e => {
		e.preventDefault();
		let random = Math.floor(Math.random() * demoUsers.length);
		fetchTracks(demoUsers[random]);
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
						<StyledAltLink href="#" onClick={launchDemo}>
							Don't have soundcloud? Don't worry! Click here to
							get started.
						</StyledAltLink>
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
const mapDispatchToProps = {fetchUser, fetchTracks, resetUser, clearErrors};

export default connect(mapStateToProps, mapDispatchToProps)(SCForm);
