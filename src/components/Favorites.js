import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './Header';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  state = {
    isLoading: false,
    // isFavorite: true,
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

  loading = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => this.recoverFavoriteFromLocalStorage(),
    );
    this.recoverFavoriteFromLocalStorage();
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
      <div data-testid="page-favorites">
        <Header />
        Página dos Favoritos
        <div>
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
          {/* <MusicCard
            albumSongList={ albumSongList }
          /> */}
        </div>

      </div>

    );
  }
}

export default Favorites;
