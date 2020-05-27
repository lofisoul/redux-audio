import React, {useEffect} from 'react';
import {Inner} from './styled';
import {Provider} from 'react-redux';
import store from './store';
import Header from './Header';
import SCForm from './SCForm';
import SCList from './SCList';
import SC from 'soundcloud';
import Player from './Player';
import AlertList from './AlertList';

const App = () => {
	useEffect(() => {
		SC.initialize({
			client_id: process.env.REACT_APP_SC_ID,
		});
	});
	return (
		<Provider store={store}>
			<Header />
			<AlertList />
			<Inner>
				<SCForm />
				<SCList />
			</Inner>
			<Player></Player>
		</Provider>
	);
};

export default App;
