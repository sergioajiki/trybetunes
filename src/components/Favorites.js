import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './Header';
import MusicCard from './MusicCard';
import './Favorites.css';

class Favorites extends React.Component {
  state = {
    isLoading: false,
    listFavoriteSongs: [],
  };

  componentDidMount() {
    this.loading();
  }

  componentDidUpdate() {
    this.recoverFavoriteFromLocalStorage();
    // this.loading();
  }

  recoverFavoriteFromLocalStorage = async () => {
    const listFavoriteSongs = await getFavoriteSongs();
    this.setState({
      listFavoriteSongs,
    });
  };

  loading = async () => {
    this.setState(
      {
        isLoading: true,
      },
      // () => this.recoverFavoriteFromLocalStorage(),
    );
    await this.recoverFavoriteFromLocalStorage();
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { isLoading, listFavoriteSongs } = this.state;
    if (isLoading) {
      return <h2>Carregando...</h2>;
    }
    return (
      <div
        data-testid="page-favorites"

      >
        <Header />
        Página dos Favoritos

        <div className="rightSide">
          {
            listFavoriteSongs.map((song) => (
              <MusicCard
                key={ song.trackId }
                song={ song }
                trackName={ song.trackName }
                trackId={ song.trackId }
                previewUrl={ song.previewUrl }
              />
            ))
          }
        </div>
      </div>

    );
  }
}

export default Favorites;
