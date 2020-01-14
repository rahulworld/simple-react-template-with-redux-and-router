import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { sortColumnType, SORT_COLUMN } from '../shared/constants';
import { sortAndFilterData, getDetailedFund } from '../actions';

class Table extends React.Component {
	state = {
        currentSort: 'default',
        sortColumn: SORT_COLUMN.NAME,
	};

	onSortChange = (sortColumnName) => {
		const { currentSort } = this.state;
		let nextSort;
		if (currentSort === 'up') nextSort = 'default';
		else if (currentSort === 'default') nextSort = 'up';

		this.setState({
			currentSort: nextSort,
			sortColumn: sortColumnName,
		});
		this.props.sortAndFilterData(nextSort, sortColumnName);
    };

	render() {
		const { data } = this.props;
		const { currentSort, sortColumn } = this.state;
		return (
			data.length > 0 && (
				<table className='table table-striped text-left'>
                    <thead>
                        <tr>
                        <th scope="col">
                            Fund Name
                            <button className="m-1" onClick={() => this.onSortChange(SORT_COLUMN.NAME)}>
                                <i className={`fas fa-${sortColumn === SORT_COLUMN.NAME ? sortColumnType(SORT_COLUMN.NAME)[currentSort].class : 'sort'}`} />
                            </button>
                        </th>
                        <th scope="col">
                            Category
                            <button className="m-1" onClick={() => this.onSortChange(SORT_COLUMN.FUND_CATEGORY)}>
                                <i className={`fas fa-${sortColumn === SORT_COLUMN.FUND_CATEGORY ? sortColumnType(SORT_COLUMN.FUND_CATEGORY)[currentSort].class : 'sort'}`} />
                            </button>
                        </th>
                        <th scope="col">
							Type
							<button className="m-1" onClick={() => this.onSortChange(SORT_COLUMN.FUND_TYPE)}>
                                <i className={`fas fa-${sortColumn === SORT_COLUMN.FUND_TYPE ? sortColumnType(SORT_COLUMN.FUND_TYPE)[currentSort].class : 'sort'}`} />
							</button>
						</th>
                        <th scope="col">
							Plan
							<button className="m-1" onClick={() => this.onSortChange(SORT_COLUMN.PLAN)}>
                                <i className={`fas fa-${sortColumn === SORT_COLUMN.PLAN ? sortColumnType(SORT_COLUMN.PLAN)[currentSort].class : 'sort'}`} />
                            </button>
						</th>
                        <th scope="col">1st returns</th>
                        <th scope="col">3rd returns</th>
                        </tr>
                    </thead>
                    <tbody>
                        { [...data].map((mf) =>
                        <tr key={mf.code}>
                            <th style={{width: '35%', cursor: 'pointer' }}><Link to={`/fund/${mf.code}`} activeClassName="active">{mf.name}</Link></th>
                            <td style={{width: '15%'}}>{mf.fund_category}</td>
                            <td style={{width: '10%'}}>{mf.fund_type}</td>
                            <td style={{width: '10%'}}>{mf.plan}</td>
                            <td style={{width: '10%'}}>{mf.returns["year_1"]}</td>
                            <td style={{width: '10%'}}>{mf.returns["year_3"]}</td>
                        </tr>
                        )}
                    </tbody>
				</table>
			)
		);
	}
}

function mapStateToProps({mutualFunds}) {
	return {
	  mutualFundList: mutualFunds.mutualFundList,
	  selectedItem: mutualFunds.selectedItem,
	  sortList: mutualFunds.sortList,
	};
}
  
export default connect(mapStateToProps, { sortAndFilterData, getDetailedFund })(Table);