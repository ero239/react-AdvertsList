import {createStore} from 'redux';
import reducers from './reducers';

const initialState = {};

/* eslint-disable no-underscore-dangle */
export default createStore(reducers, initialState);
/* eslint-enable */
