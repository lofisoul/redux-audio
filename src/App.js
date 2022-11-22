import React, {useEffect, useState} from 'react';
import {Inner} from './styled';
import {Provider} from 'react-redux';
import store from './store';
import Header from './Header';
import SCForm from './SCForm';
import SCList from './SCList';
import Player from './Player';
import AlertList from './AlertList';
import {useSoundcloud} from './hooks/useSoundcloud';
/*
REACT_APP_SC_ID="41aceb0d516e657897a0eb7ab22c9f99"
REACT_APP_SC_SECRET="3637e5ba852bf8d02a7714d22e486854"
access-token : `2-128955--90bxsdoMu9GvVJwYN43uh6p`
refresh-token: `KeSBT8Wx76FMRIaILVyWPaCKNfxNKPZ5`
*/
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
