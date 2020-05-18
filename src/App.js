import React, {useEffect} from 'react';
import {Inner} from './styled';
import {Provider} from 'react-redux';
import store from './store';
import SCForm from './SCForm';
import SCList from './SCList';
import User from './User';
import SC from 'soundcloud';
import Player from './Player';

const App = () => {
	useEffect(() => {
		SC.initialize({
			client_id: process.env.REACT_APP_SC_ID,
		});
	});
	return (
		<Provider store={store}>
			{console.log(store.getState())}
			<Inner>
				<SCForm />
				<User />
				<SCList />
			</Inner>
			<Player></Player>
		</Provider>
	);
};

export default App;
