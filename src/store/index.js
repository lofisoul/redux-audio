import {createStore, compose, applyMiddleware} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import {devToolsEnhancer} from 'redux-devtools-extension';
import api from '../sc-api';

const store = createStore(
	reducer,
	compose(applyMiddleware(thunk.withExtraArgument(api)), devToolsEnhancer()),
);

export default store;
