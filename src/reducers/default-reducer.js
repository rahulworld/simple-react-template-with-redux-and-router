import { FETCH_DATA, SELECTED_FILTER_ITEM, SORT_DATA, FUND_DETAIL } from '../actions';

const INITIAL_STATE = {
    mutualFundList: [],
    sortList: [],
    fundCategory: [],
    fundType: [],
    plan: [],
    selectFundCategory: '',
    selectFundType: '',
    selectPlan: '',
    selectedFund: {},
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_DATA:
            return { ...state, ...action.payload };
        case SELECTED_FILTER_ITEM:
            return { ...state, selectedItem: action.payload };
        case SORT_DATA:
            return { ...state, ...action.payload };
        case FUND_DETAIL:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}