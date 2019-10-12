import React, {Component} from 'react';
import Button from "../../Components/UI/Button";
import './Style.scss';
import Input from "../../Components/UI/Input";
import {connect} from "react-redux";
import {userLoginStart, userRegStart, userLoginOrRegError} from "../../../Actions/auth";

class Auth extends Component {
  state = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    inputUsernameClass: '',
    inputPasswordClass: '',
  };

  handleInputUsername = async (e) => {
    await this.setState({username: e.target.value});

    if (this.state.username.length > 5) {
      this.setState({
        inputUsernameClass: 'input--complete',
      });
    } else {
      this.setState({
        inputUsernameClass: 'input--error',
      });
    }
  };

  handleInputPassword = async (e) => {
    await this.setState({password: e.target.value});

    if (this.state.password.length > 5) {
      this.setState({
        inputPasswordClass: 'input--complete',
      });
    } else {
      this.setState({
        inputPasswordClass: 'input--error',
      });
    }
  };

  handleRegister = async () => {
    if (this.state.username.length < 6 || this.state.password.length < 6) {
      if (this.state.username.length < 6) {
        this.setState({
          inputUsernameClass: 'input--error',
        });
      }

      if (this.state.password.length < 6) {
        this.setState({
          inputPasswordClass: 'input--error',
        });
      }

      this.props.userLoginOrRegError('Длина логина и пароля, должна быть не менее 6 символов');
    } else {
      this.props.userRegStart(this.state.username, this.state.password);
    }
  };

  handleAuth = () => {
    if (this.state.username.length < 6 || this.state.password.length < 6) {
      if (this.state.username.length < 6) {
        this.setState({
          inputUsernameClass: 'input--error',
        });
      }

      if (this.state.password.length < 6) {
        this.setState({
          inputPasswordClass: 'input--error',
        });
      }
      this.props.userLoginOrRegError('Длина логина и пароля, должна быть не менее 6 символов');
    } else {
      this.props.userLoginStart(this.state.username, this.state.password);
    }
  };

  render() {
    return (
        <div className="auth container">
          <div className="auth__inner">
            <span className="auth__title">Вход</span>
            <span className="auth__error">{this.props.authErrorMessage}</span>

            <div className="auth__inputs">
              <Input
                  value={this.state.username}
                  onChange={this.handleInputUsername}
                  class={`
                    auth__input 
                    ${this.state.inputUsernameClass ? this.state.inputUsernameClass : ''}
                  `}
                  placeholder="Логин"
                  minLength={6}
                  maxLength={24}
              />
              <Input
                  value={this.state.password}
                  onChange={this.handleInputPassword}
                  type="password"
                  class={`
                    auth__input 
                    ${this.state.inputPasswordClass ? this.state.inputPasswordClass : ''}
                  `}
                  placeholder="Пароль"
                  minLength={6}
                  maxLength={24}
              />
            </div>

            <div className="auth__buttons">
              <Button
                  class="button--green auth__button"
                  onClick={this.handleAuth}
                  type="button"
              >Вход
              </Button>

              <Button
                  class="button--blue auth__button"
                  onClick={this.handleRegister}
                  type="button"
              >Регистрация
              </Button>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.tokenAuth,
  authErrorMessage: state.auth.error_message,
});

const mapDispatchToProps = {
  userLoginStart,
  userRegStart,
  userLoginOrRegError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);