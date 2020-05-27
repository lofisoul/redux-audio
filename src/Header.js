import React from 'react';
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

export default Header;
