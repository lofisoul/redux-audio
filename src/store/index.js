import {createStore, compose, applyMiddleware} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import api from '../sc-api';

const composeEnhancers = composeWithDevTools({
	trace: true, // (action) => { return ‘trace as string’; }
	traceLimit: 25,
});

const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk.withExtraArgument(api))),
);

export default store;
