import React, {Component} from 'react';
import {connect} from "react-redux";
import './style.scss';
import Auth from "./Containers/Auth";
import {Route, Switch} from 'react-router-dom';
import {router} from './../Router'
import Header from "./Components/Header";

class Index extends Component {
  render() {
    return (
        <div className="App">
          <Header/>
          <div className="main">
            {
              this.props.authToken ? (
                  <Switch>
                    {router.map((props, index) => <Route key={index} {...props}/>)}
                  </Switch>
              ) : (
                  <Route exact path="/" component={Auth}/>
              )
            }
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.tokenAuth,
  userLoginLoading: state.auth.loading,
});

export default connect(mapStateToProps)(Index);
