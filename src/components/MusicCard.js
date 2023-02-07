import React from 'react';
// import Header from './Header';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './MusicCard.css';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    // checked: false,
    isFavorite: false,
  };

  componentDidMount() {
    this.checkIsFavorite();
  }

  componentDidUpdate() {

  }

  // recoverFavoritesFromLocalStorage = async () => {
  //   this.setState({
  //     isLoading: true,
  //   });
  //   const favoriteSongs = await getFavoriteSongs();
  //   this.setState({
  //     favoritesLocalStorage: favoriteSongs,
  //     isLoading: false,
  //   });
  //   console.log(favoriteSongs);
  // };
  checkIsFavorite = async () => {
    const { song } = this.props;
    this.setState({
      isLoading: true,
    });
    const favoriteSongs = await getFavoriteSongs();
    const isFavorite = favoriteSongs
      .some((track) => track.trackId === song.trackId);
    if (isFavorite) {
      this.setState({
        // checked: true,
        isFavorite: true,
      });
    }
    // console.log(isFavorite);
    this.setState({
      isLoading: false,

    });

    // isFavorite
    //   ? this.setState({ checked: true })
    //   : this.setState({ checked: false });
  };

  favoriteSong = async () => {
    const { song } = this.props;
    const { isFavorite } = this.state;
    // const { isFavorite } = this.state;
    // console.log(isFavorite);
    this.setState({
      isLoading: true,
    });
    if (!isFavorite) {
      await addSong(song);
      this.setState({
        // checked: true,
        isLoading: false,
        isFavorite: true,
      });
    } else {
      await removeSong(song);
      this.setState({
        // checked: false,
        isLoading: false,
        isFavorite: false,
      });
    }

    // console.log(typeof (song));
    // console.log(this);
  };

  // checkHasSong = async (trackId) => {
  //   const { albumSongList } = this.props;
  //   const favoriteSong = albumSongList.find((song) => song.trackId === trackId);
  //   await addSong(favoriteSong);
  //   this.setState({
  //     checked: true,
  //     isLoading: false,
  //   });
  // };

  // checkHasSong = async (trackId) => {
  //   //   const songsOfLocalStorage = await getFavoriteSongs();
  //   const hasSong = songsOfLocalStorage.includes(song);
  //   console.log(hasSong);
  //   if (hasSong) {
  //     await removeSong(song);
  //     this.setState({
  //       checked: false,
  //     });
  //   } else {
  //     await addSong(song);
  //     this.setState({
  //       checked: true,
  //     });
  //   }
  //   this.setState({
  //     isLoading: false,
  //   });
  //   console.log(songsOfLocalStorage);
  // };

  // validateCheck = async (song) => {
  //   const songsOfLocalStorage = await getFavoriteSongs();
  //   console.log(typeof (songsOfLocalStorage[0]));
  //   console.log(songsOfLocalStorage);
  //   const checkedValue = songsOfLocalStorage.some((id) => id === song);
  //   checkedValue ? await removeSong(song) : await addSong(song)
  //   console.log(checkedValue);
  //   // return checkedValue;
  // };

  // checkHasFavorite = () => {
  //   const { albumSongList } = this.props;
  //   const { favoritesLocalStorage } = this.state;
  //   // const searchFavorite = songsLocalStorage.includes(albumSongList.trackId);
  //   const searchFavorite = favoritesLocalStorage
  //     .some((song) => song.id === albumSongList.trackId);
  //   // searchFavorite ? this.setState({ checked: true }) : this.setState({ checked: false });
  //   if (searchFavorite) this.setState({ checked: true });

  //   console.log(searchFavorite);
  //   console.log('Props', albumSongList);
  //   console.log('state', favoritesLocalStorage);
  // };

  render() {
    // console.log()
    // console.log(this.validateCheck());
    const { trackName, trackId, previewUrl } = this.props;
    const { isLoading, isFavorite } = this.state;
    // this.checkHasFavorite();

    if (isLoading) {
      return <h2>Carregando...</h2>;
    }
    return (
      <div className="musicList">

        {
          <div className="musicLine">
            <span className="musicLine">
              <p className="nameSong">
                { trackName }
              </p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </span>
            <label
              data-testid={ `checkbox-music-${trackId}` }
              htmlFor={ trackId }
            >
              Favorita
              <input
                id={ trackId }
                // name="favoriteCheck"
                type="checkbox"
                checked={ isFavorite }
                // comparar o id com o id do localhost para confirmar se checked is true or false
                // onChange={ () => console.log('Mudou o check') }
                onChange={ () => this.favoriteSong(trackId) }
                // onChange={ this.validateCheck(song.trackId) }
              />
            </label>
          </div>

        }
      </div>
    );
  }
}

// MusicCard.propTypes = {
//   albumSongList: PropTypes.arrayOf(
//     PropTypes.shape({
//       trackName: PropTypes.string,
//       previewUrl: PropTypes.string,
//     }),
//   ).isRequired,
// };
MusicCard.propTypes = {
  song: PropTypes.shape().isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
  // albumSongList: PropTypes.array.isRequired,
};

export default MusicCard;
