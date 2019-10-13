import {combineReducers} from 'redux';

import user from './userReducer';
import nav from './navReducer';

export default combineReducers({user, nav});
