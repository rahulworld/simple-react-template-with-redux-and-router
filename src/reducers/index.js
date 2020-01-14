import { combineReducers } from 'redux';
import mutualFundsReducer from './default-reducer';

const rootReducers = combineReducers({
    mutualFunds: mutualFundsReducer
});

export default rootReducers;