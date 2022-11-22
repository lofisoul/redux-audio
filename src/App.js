import React from 'react';
import {Inner} from './styled';
import {Provider} from 'react-redux';
import store from './store';
import Header from './Header';
import SCForm from './SCForm';
import SCList from './SCList';
import Player from './Player';
import AlertList from './AlertList';
import {useSoundcloud} from './hooks/useSoundcloud';

const App = () => {
	useSoundcloud();

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
