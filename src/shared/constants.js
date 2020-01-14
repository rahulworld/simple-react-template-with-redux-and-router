export const sortColumnType = (column) => {
    return {
        up: {
            class: 'sort-up',
            fn: (a, b) => a[column] - b[column]
        },
        down: {
            class: 'sort-down',
            fn: (a, b) => b[column] - a[column]
        },
        default: {
            class: 'sort',
            fn: (a, b) => a
        }
    }
};

export const SORT_COLUMN = {
    NAME: 'name',
    FUND_CATEGORY: 'fund_category',
    FUND_TYPE: 'fund_type',
    PLAN: 'plan',
};

export const FILTER_ITEM = {
    'selectFundCategory': 'fund_category',
    'selectFundType': 'fund_type',
    'selectPlan': 'plan',
};
