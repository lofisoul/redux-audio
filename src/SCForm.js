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
	max-width: 570px;
	margin: 0 auto;
	& h2 {
		text-align: center;
		margin: 0;
		margin-bottom: 1rem;
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

const Tagline = styled.div`
	text-align: center;
	@media (min-width: 576px) {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		grid-gap: 15px;
	}
	& > div {
		margin-bottom: 2rem;
	}
	& h3 {
		margin: 0 0 1rem;
	}
	& p {
		font-size: 1.3rem;
		line-height: 1.5;
		margin: 0;
	}
	& .fas,
	& .fab {
		font-size: 3rem;
		color: #0e317d;
		@media (min-width: 576px) {
			font-size: 5rem;
		}
	}
	& .fa-soundcloud {
		color: #ffd800;
	}
	& .fa-random {
		color: #aadaf7;
	}
	& .fa-headphones-alt {
		color: #aaf7c6;
	}
	& > div:nth-of-type(2) {
		display: none;
		@media (min-width: 576px) {
			display: block;
			align-self: center;
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
	clearErrors,
}) => {
	const [username, setUsername] = useState('');
	const handleSubmit = e => {
		e.preventDefault();
		fetchTracks(username);
		setUsername('');
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
					<Tagline>
						<div>
							<i className="fab fa-soundcloud"></i>
							<h3>Enter a username</h3>
							<p>
								Vibe Tribe uses the username of your soundcloud
								profile url.
							</p>
						</div>
						<div>
							<i className="fas fa-random"></i>
						</div>
						<div>
							<i className="fas fa-headphones-alt"></i>
							<h3>Explore new sounds</h3>
							<p>10 likes from you.</p>
							<p>10 likes from the soundcloud community.</p>
						</div>
					</Tagline>

					<StyledForm onSubmit={handleSubmit}>
						<label>Find your tribe and vibe.</label>
						<input
							type="text"
							name="username"
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
						<Button type="submit">Launch</Button>
						<StyledAltLink href="#" onClick={launchDemo}>
							Don't have soundcloud? Don't worry! Click here to
							generate a playlist.
						</StyledAltLink>
					</StyledForm>
				</FormWrap>
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
