import React from 'react';
import Header from './Header';

class Search extends React.Component {
  state = {
    isLogButtonDisabled: true,
    artistName: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateButtonLogin());
  };

  validateButtonLogin = () => {
    const { artistName } = this.state;
    const minLength = 2;
    const validButton = artistName.length < minLength;
    this.setState({ isLogButtonDisabled: validButton });
  };

  render() {
    const { isLogButtonDisabled, artistName } = this.state;

    return (
      <div data-testid="page-search">
        Página do Search
        <Header />
        <form>
          <label htmlFor="artistName">
            <input
              data-testid="search-artist-input"
              id="artistName"
              name="artistName"
              type="text"
              value={ artistName }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isLogButtonDisabled }
            onClick={ () => console.log('Clicou no botão Procurar ') }
          >
            Procurar
          </button>

        </form>

      </div>
    );
  }
}

export default Search;
