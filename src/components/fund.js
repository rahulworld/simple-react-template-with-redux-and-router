import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDetailedFund } from '../actions';
import { Link } from "react-router-dom";

class Fund extends Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getDetailedFund(id);
  }

  render() {
    const { selectedFund } = this.props;

    return (
      <div className="container">
          <div className="row mt-4">
                <div className="col-3 mt-3"><Link to={`/funds`} activeClassName="active"><i className="fa fa-arrow-left" />  Back</Link></div>
          </div>
        <h4 className="text-center m-3">Kuvera - Fund Detail</h4>
        {!selectedFund && <h5 className="text-center m-3">No funds</h5>}
        {selectedFund &&
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th scope="row">Code</th>
                        <td>{selectedFund.code}</td>
                    </tr>
                    <tr>
                        <th scope="row">Name</th>
                        <td>{selectedFund.name}</td>
                    </tr>
                    <tr>
                        <th scope="row">Short Name</th>
                        <td>{selectedFund.short_name}</td>
                    </tr>
                    <tr>
                        <th scope="row">category</th>
                        <td>{selectedFund.category}</td>
                    </tr>
                    <tr>
                        <th scope="row">Start Date</th>
                        <td>{selectedFund.start_date}</td>
                    </tr>
                    <tr>
                        <th scope="row">Fund Type</th>
                        <td>{selectedFund.fund_type}</td>
                    </tr>
                    <tr>
                        <th scope="row">Fund Category</th>
                        <td>{selectedFund.fund_category}</td>
                    </tr>
                    <tr>
                        <th scope="row">Plan</th>
                        <td>{selectedFund.plan}</td>
                    </tr>
                    <tr>
                        <th scope="row">Manager</th>
                        <td>{selectedFund.fund_manager}</td>
                    </tr>
                    <tr>
                        <th scope="row">Maturity Type</th>
                        <td>{selectedFund.maturity_type}</td>
                    </tr>
                </tbody>
            </table>
        }
      </div>
    );
  }
}

function mapStateToProps({mutualFunds}) {
  return {
      selectedFund: mutualFunds.selectedFund,
  };
}

export default connect(mapStateToProps, { getDetailedFund })(Fund);
