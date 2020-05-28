import React, {useState} from 'react';
import StyledUserInfo from './styled/StyledUserInfo';

const UserInfo = ({user}) => {
	const [isOpen, setIsOpen] = useState(false);
	console.log(isOpen);
	const toggleDrawer = e => {
		console.log(!isOpen);
		setIsOpen(!isOpen);
	};

	return (
		<StyledUserInfo isOpen={isOpen}>
			<div className="user-img" onClick={toggleDrawer}>
				{user.avatar_url ? (
					<img src={user.avatar_url} alt={user.username} />
				) : (
					<img
						src="https://gradientjoy.com/200?id=229"
						alt={user.username}
					/>
				)}
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
