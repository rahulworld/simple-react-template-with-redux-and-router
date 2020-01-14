import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FundList from './components/fundList';
import Fund from './components/fund';

class RouteNavigation extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
            {/* <Route path="/" render={(props) => <FundList {...props} /> } /> */}
            <Route path="/funds" render={(props) => <FundList {...props} /> } />
            <Route path="/fund/:id" render={(props) => <Fund {...props} /> } />
        </Switch>
      </Router>
    );
  }
}

export default RouteNavigation;
