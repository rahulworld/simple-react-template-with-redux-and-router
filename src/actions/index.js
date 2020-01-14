import axios from 'axios';
import { FILTER_ITEM } from '../shared/constants';

export const FETCH_DATA = 'KUVERA/FETCH_DATA';
export const SELECTED_FILTER_ITEM = 'KUVERA/SELECTED_FILTER_ITEM';
export const SORT_DATA = 'KUVERA/SORT_DATA';
export const FUND_DETAIL = 'KUVERA/FUND_DETAIL';


export const getMutualFunds = () => async (dispatch) => {
    axios.get(`https://api.kuvera.in/api/v3/funds.json`)
    .then(response => {
      if (response.status) {
        const data = response.data;
        const category = [...new Set(data.map(item => item.fund_category))];
        const type = [...new Set(data.map(item => item.fund_type))];
        const plan = [...new Set(data.map(item => item.plan))];
        dispatch({
          type: FETCH_DATA,
          payload: { mutualFundList: data, sortList: data.splice(0, 100), fundCategory: category, fundType: type, plan: plan },
        });
      }
    });
};

export const getDetailedFund = (code) => async (dispatch) => {
    axios.get(`https://api.kuvera.in/api/v3/funds/${code}.json`)
    .then(response => {
        console.log('response', response);
      if (response.status) {
        dispatch({
          type: FUND_DETAIL,
          payload: { selectedFund: response.data[0] },
        });
      }
    });
};

export const sortAndFilterData = (currentSort = '', column = 'name') => async (dispatch, getState) => {
    const { mutualFundList, selectPlan, selectFundCategory, selectFundType } = getState().mutualFunds;
    let payload = [];
    const sortType = {
        up: {
            class: 'sort-up',
            fn: function(a, b) {
                if(a[column] < b[column]){
                    return -1;
                }else if(a[column] > b[column]){
                    return 1;
                }else{
                    return 0;   
                }
            }
        },
        default: {
            class: 'sort',
            fn: (a, b) => a
        },
    }
    if (mutualFundList.length > 0) {
        if (currentSort === 'up') {
            payload = mutualFundList.slice().sort(sortType[currentSort].fn);
        } else {
            payload = mutualFundList;
        }
        payload = payload.filter((item) => 
            (!selectPlan || item[FILTER_ITEM['selectPlan']] === selectPlan) &&
            (!selectFundCategory || item[FILTER_ITEM['selectFundCategory']] === selectFundCategory) &&
            (!selectFundType || item[FILTER_ITEM['selectFundType']] === selectFundType));
        dispatch({
            type: SORT_DATA,
            payload: {sortList: payload.slice(0, 100)},
        });
    }
};

export const getFilterData = (filterType, filterValue) => async (dispatch) => {
    dispatch({ type: FETCH_DATA, payload: { [filterType]: filterValue } });
}