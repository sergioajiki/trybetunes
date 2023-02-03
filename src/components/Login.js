import React from 'react';
import '../services/userAPI';

class Login extends React.Component {
  state = {
    isLoading: false,
    name: '',
    isLogButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateButtonLogin());

    // const minLength = 3;
    // const validButton = value.length < minLength;
    // this.setState({ isLogButtonDisabled: validButton });
    // console.log(value.length);
  };

  validateButtonLogin = () => {
    const { name } = this.state;
    // console.log(name);
    const minLength = 3;
    const validButton = name.length < minLength;
    return validButton;
    // return this.setState({ isLogButtonDisabled: validButton });
    // console.log(value.length);
    // console.log(validButton);
  };

  render() {
    const { isLogButtonDisabled } = this.state;
    console.log(isLogButtonDisabled);
    return (
      <div data-testid="page-login">
        Login
        <form>
          <label htmlFor="name">
            <input
              id="name"
              name="name"
              type="text"
              onChange={ this.handleChange }
              data-testid="login-name-input"
            />
          </label>
          <br />

          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isLogButtonDisabled }
            onClick={ this.createUser }
            // onClick={ () => console.log('Clicou no botão do login') }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
