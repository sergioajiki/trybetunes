import React from 'react';
// import Header from './Header';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './MusicCard.css';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    checked: false,
  };

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  favoriteSong = async (song) => {
    // console.log(typeof (song));
    this.setState({
      isLoading: true,
    }, () => this.checkHasSong(song));
    // const songsOfLocalStorage = await getFavoriteSongs();
    // const hasSong = songsOfLocalStorage.includes(song);
    // console.log(hasSong);

    // if (hasSong) {
    //   await removeSong(song);
    // } else {
    //   await addSong(song);
    // }
    // console.log(songsOfLocalStorage);
    // this.setState({
    //   isLoading: false,
    // });
  };

  // hasSong
  //   ? await removeSong(song)
  //   : await addSong(song);

  checkHasSong = async (song) => {
    const songsOfLocalStorage = await getFavoriteSongs();
    const hasSong = songsOfLocalStorage.includes(song);
    console.log(hasSong);
    if (hasSong) {
      await removeSong(song);
      this.setState({
        checked: false,
      });
    } else {
      await addSong(song);
      this.setState({
        checked: true,
      });
    }
    this.setState({
      isLoading: false,
    });
    console.log(songsOfLocalStorage);
  };
  // validateCheck = async (song) => {
  //   const songsOfLocalStorage = await getFavoriteSongs();
  //   console.log(typeof (songsOfLocalStorage[0]));
  //   console.log(songsOfLocalStorage);
  //   const checkedValue = songsOfLocalStorage.some((id) => id === song);
  //   checkedValue ? await removeSong(song) : await addSong(song)
  //   console.log(checkedValue);
  //   // return checkedValue;
  // };

  render() {
    // console.log(this.validateCheck());
    const { trackName, trackId, previewUrl } = this.props;
    const { isLoading, checked } = this.state;
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
                checked={ checked }
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
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
