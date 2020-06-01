import React from 'react';
import styled, {keyframes} from 'styled-components';
import {connect} from 'react-redux';

const dummyAnimation = keyframes`
0% {opacity:1}
50% {opacity:.5}
100% {opacity:1}
`;

const UserWrap = styled.a`
	display: flex;
	align-items: center;
	background: #b2e6d4;
	padding: 5px;
	border-radius: 40px;
	color: #222;
	text-decoration: none;
	align-self: center;
	& > span {
		display: none;
	}
	@media (min-width: 576px) {
		padding: 5px 25px 5px 5px;
		& > span {
			display: inline;
		}
	}
`;

const DummyUser = styled.div`
	display: flex;
	align-items: center;
	background: #b2e6d4;
	padding: 5px;
	border-radius: 40px;
	align-self: center;
	@media (min-width: 576px) {
		width: 100px;
	}
	& > div {
		display: inline-block;
		width: 40px;
		background: #222;
		height: 40px;
		margin-right: 0;
		border-radius: 50%;
		animation: ${dummyAnimation} 1s ease-in-out infinite;
		@media (min-width: 576px) {
			margin-right: 1rem;
		}
	}
`;

const UserImage = styled.img`
	height: 40px;
	margin-right: 0;
	border-radius: 50%;
	@media (min-width: 576px) {
		margin-right: 1rem;
	}
`;

const User = ({user, loadUser}) => {
	return (
		<>
			{loadUser && !user && (
				<DummyUser>
					<div></div>
				</DummyUser>
			)}
			{user && (
				<UserWrap
					href={user.permalink_url}
					target="_blank"
					rel="noopener noreferrer"
				>
					<UserImage src={user.avatar_url} alt={user.username} />
					<span>{user.username}</span>
				</UserWrap>
			)}
		</>
	);
};

const mapStateToProps = state => ({
	user: state.user,
	loadUser: state.loadUser,
});

export default connect(mapStateToProps)(User);
