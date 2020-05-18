import React, {useState} from 'react';
import {StyledForm} from './styled';
import {connect} from 'react-redux';
import {fetchUser, fetchTracks} from './store/actions';

const SCForm = ({fetchUser, fetchTracks, user}) => {
	const [username, setUsername] = useState('');
	const handleSubmit = e => {
		e.preventDefault();
		fetchUser(username);
		fetchTracks(username);
	};
	return (
		<div>
			<h2>Soundcloud Form</h2>
			<StyledForm onSubmit={handleSubmit}>
				{!user && (
					<input
						type="text"
						name="username"
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				)}
				<button type="submit">{!user ? 'Launch' : 'Reset'}</button>
			</StyledForm>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user,
	};
};
const mapDispatchToProps = {fetchUser, fetchTracks};

export default connect(mapStateToProps, mapDispatchToProps)(SCForm);
