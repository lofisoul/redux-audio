import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

const UserWrap = styled.div`
	display: flex;
	align-items: center;
`;

const UserImage = styled.img`
	height: 40px;
	margin-left: 2rem;
	border-radius: 50%;
`;

const User = ({user, loadUser}) => {
	return (
		<>
			{loadUser && !user && <div>LOADING</div>}
			{user && (
				<UserWrap>
					<h1>Welcome, {user.username}</h1>
					<UserImage src={user.avatar_url} alt={user.username} />
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
