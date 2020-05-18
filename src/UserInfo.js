import React, {useState} from 'react';
import StyledUserInfo from './styled/StyledUserInfo';

const UserInfo = ({user}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDrawer = e => {
		setIsOpen(!isOpen);
	};

	return (
		<StyledUserInfo isOpen={isOpen}>
			<div className="user-img" onClick={toggleDrawer}>
				<img src={user.avatar_url} alt={user.username} />
			</div>
			<div className="user-drawer">
				<h3>{user.username}</h3>
				<a
					href={user.permalink_url}
					target="_blank"
					rel="noopener noreferrer"
				>
					Follow
				</a>
			</div>
		</StyledUserInfo>
	);
};

export default UserInfo;
