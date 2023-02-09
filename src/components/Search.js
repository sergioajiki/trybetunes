import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import './Search.css';

class Search extends React.Component {
  state = {
    artistName: '',
    wantedArtist: '',
    infoArtist: [],
    isLoading: false,
    isLogButtonDisabled: true,
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
    const infoArtist = await searchAlbumsAPI(artistName);
    this.setState({
      isLoading: false,
      infoArtist,
      wantedArtist: artistName,
      artistName: '',

    });
    // console.log(infoArtist);
    return infoArtist;
  };

  render() {
    const {
      isLogButtonDisabled,
      isLoading,
      artistName,
      infoArtist,
      wantedArtist,
    } = this.state;
    if (isLoading) {
      return <h2>Carregando...</h2>;
    }
    // console.log(infoArtist.length);
    return (
      <div
        data-testid="page-search"
        className="search"
      >
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
            <h2>
              {
                `Resultado de álbuns de: ${wantedArtist}`
              }
            </h2>
            <div />
            <div>
              {
                infoArtist.length === 0
                  ? <h2>Nenhum álbum foi encontrado</h2>
                  : infoArtist.map((info, index) => (
                    <div key={ index }>
                      <Link
                        data-testid={ `link-to-album-${info.collectionId}` }
                        to={ `/album/${info.collectionId}` }
                      >
                        {info.collectionName}
                      </Link>

                    </div>
                  ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
