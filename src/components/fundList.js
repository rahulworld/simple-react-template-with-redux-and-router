import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getMutualFunds, sortAndFilterData, getFilterData } from '../actions';
import Table  from './table';

class FundList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSort: 'default',
      selectFundCategory: '',
      selectFundType: '',
      selectPlan: '',
      search: '',
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeDropDown = this.onChangeDropDown.bind(this);
  }

  componentDidMount() {
    this.props.getMutualFunds();
  }

  onChangeDropDown(type, data) {
    if (data) {
      this.setState({ [type]: data });
      this.props.getFilterData(type, data.label);
      this.props.sortAndFilterData();
    }
  }

  searchFilterInJson() {
    const { search } = this.state;
    if (search) {
      // this.setState({ [type]: data });
      // this.props.getFilterData(type, data.label);
      // this.props.sortAndFilterData();
    }
  }

  onChangeInput = (event) => {
    this.setState({ search: event.target.value});
  }

  renderDropDown(selectedItem, placeholder, data, selectedValue) {
    const selectBoxStyle = {
      control: (base, state) => ({
        ...base,
        height: 37,
        backgroundColor: '535353',
        width: 200,
        fontSize: 13,
        cursor: 'pointer',
      }),
      option: (base, state) => ({
        ...base,
        border: '1px solid #F8F8F8',
        color: '#343B40',
        width: 200,
      }),
      indicatorSeparator: (provided, state) => (
        {
          ...provided,
          width: 0
        }
      ),
    }
    const filterItems = [];
    if(data.length > 0) {
      data.map((item, index) => filterItems.push({ value: index, label: item }))
    }

    return (
      <Select
        value={selectedValue}
        onChange={(event) => this.onChangeDropDown(selectedItem, event)}
        options={filterItems}
        placeholder = {placeholder}
        styles={selectBoxStyle}
        isSearchable= {true}
      />
    );
  }


  render() {
    const { sortList, fundCategory, fundType, plan } = this.props;
    const { search, selectFundCategory, selectFundType, selectPlan } = this.state;

    return (
      <div className="container">
        <h4 className="text-center primary-color m-3">Kuvera</h4>
        <div className="row m-3">
          <div className="col-12 m-2 ml-0">Filters</div>
          <div className="col-3">
            {this.renderDropDown('selectFundCategory', 'Category', fundCategory, selectFundCategory)}
          </div>
          <div className="col-3">
            {this.renderDropDown('selectFundType', 'Type', fundType, selectFundType)}
          </div>
          <div className="col-3">
            {this.renderDropDown('selectPlan', 'Plan', plan, selectPlan)}
          </div>
          <div className="col-3">
            <div className="row border p-1">
              <input type="text" className="col-7 form-control mr-1" id="search" placeholder="Search" onChange={this.onChangeInput} value={search} />
              <button className="btn btn-primary col-4 form-control ml-auto" onClick={() => this.searchFilterInJson()}>Search</button>
            </div>
          </div>
        </div>
        <Table data={sortList} />
      </div>
    );
  }
}

function mapStateToProps({mutualFunds}) {
  return {
    mutualFundList: mutualFunds.mutualFundList,
    sortList: mutualFunds.sortList,
    fundCategory: mutualFunds.fundCategory,
    fundType: mutualFunds.fundType,
    plan: mutualFunds.plan,
  };
}

export default connect(mapStateToProps, { getMutualFunds, getFilterData, sortAndFilterData })(FundList);
