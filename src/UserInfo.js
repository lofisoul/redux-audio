import React, {useState} from 'react';
import StyledUserInfo from './styled/StyledUserInfo';
import {LinkButton} from './styled';

const UserInfo = ({user}) => {
	const [isOpen, setIsOpen] = useState(false);
	const defaultUserImage =
		'https://a1.sndcdn.com/images/default_avatar_large.png';
	const toggleDrawer = e => {
		setIsOpen(!isOpen);
	};

	const handleImageError = e => {
		e.target.src = defaultUserImage;
	};

	return (
		<StyledUserInfo isOpen={isOpen}>
			<div className="user-img" onClick={toggleDrawer}>
				<img
					src={user.avatar_url ? user.avatar_url : '/pattern.svg'}
					alt={user.username}
					onError={handleImageError}
				/>
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
