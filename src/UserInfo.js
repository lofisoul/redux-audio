import React, {useState} from 'react';
import StyledUserInfo from './styled/StyledUserInfo';
import {LinkButton} from './styled';

const UserInfo = ({user}) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleDrawer = e => {
		setIsOpen(!isOpen);
	};

	return (
		<StyledUserInfo isOpen={isOpen}>
			<div className="user-img" onClick={toggleDrawer}>
				{user.avatar_url ? (
					<img src={user.avatar_url} alt={user.username} />
				) : (
					<img src="/pattern.svg" alt={user.username} />
				)}
			</div>
			<div className="user-drawer">
				<h3>{user.username}</h3>
				<LinkButton
					href={user.permalink_url}
					target="_blank"
					rel="noopener noreferrer"
				>
					Follow
				</LinkButton>
			</div>
		</StyledUserInfo>
	);
};

export default UserInfo;
