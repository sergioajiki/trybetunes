import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import './Login.css';

class Login extends React.Component {
  state = {
    isLoading: false,
    isLogButtonDisabled: true,
    name: '',
  };

  componentDidMount() {
    // console.log('dentro didMount');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateButtonLogin());
  };

  validateButtonLogin = () => {
    const { name } = this.state;
    const minLength = 3;
    const validButton = name.length < minLength;
    this.setState({ isLogButtonDisabled: validButton });
  };

  logUser = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({
      isLoading: true,
    });
    await createUser({ name });
    this.setState({
      isLoading: false,
    });
    history.push('/search');
  };

  render() {
    const { isLogButtonDisabled, name, isLoading } = this.state;
    if (isLoading) {
      return <h2>Carregando...</h2>;
    }
    return (
      <div className="loginComponent">
        <div
          data-testid="page-login"
          className="loginForm"
        >

          <form className="formLogin">
            <span className="title">
              trybe
              <br />
              tunes
            </span>

            <label htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                value={ name }
                onChange={ this.handleChange }
                data-testid="login-name-input"
                placeholder="qual é o seu nome?"
                className="input"
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ isLogButtonDisabled }
              onClick={ this.logUser }
              className="buttonLogin"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
