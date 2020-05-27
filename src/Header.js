import React from 'react';
import {connect} from 'react-redux';
import StyledHeader from './styled/StyledHeader';
import User from './User';

const Header = ({user}) => {
	return (
		<StyledHeader>
			<h1>Vibe Tribe</h1>
			<User />
		</StyledHeader>
	);
};

const mapStateToProps = state => ({
	user: state.user,
});

export default Header;
