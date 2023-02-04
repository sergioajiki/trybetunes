import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import './Search.css';

class Search extends React.Component {
  state = {
    isLoading: false,
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

  artistSearch = async () => {
    const { artistName } = this.state;
    this.setState({
      isLoading: true,
    });
    const result = await searchAlbumsAPI(artistName);
    this.setState({
      isLoading: false,
      artistName: '',
    });
    console.log(result);
    return result;
  };

  render() {
    const { isLogButtonDisabled, isLoading, artistName } = this.state;
    if (isLoading) {
      return <h2>Carregando...</h2>;
    }
    return (
      <div data-testid="page-search" className="search">
        <Header />
        <div className="rightSide">
          <form className="form">
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
              onClick={ this.artistSearch }
            >
              Procurar
            </button>
          </form>
          <div className="results">
            Exibir Resultados
          </div>
        </div>
      </div>

    );
  }
}

export default Search;
