import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import Button from "../UI/Button";
import Container from "../Grid/Container";
import "./Style.scss"
import {userLogoutStart} from './../../../Actions/auth'

class Header extends Component {
  render() {
    return (
        <header className="header">
          <Container>
            <div className="header__inner">
              <Link to="/">Cartridges</Link>
              {
                this.props.authToken ? <Button
                    class="button--no-style button--text-white"
                    onClick={
                      () => {
                        this.props.userLogoutStart();
                      }
                    }>
                  выйти
                </Button> : ''
              }
            </div>
          </Container>
        </header>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.tokenAuth,
});

const mapDispatchToProps = {
  userLogoutStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);