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
    // favoriteSong: [],
  };

  componentDidMount() {
    this.checkIsFavorite();
  }

  componentDidUpdate() {

  }

  checkIsFavorite = async () => {
    const { song } = this.props;
    this.setState({
      isLoading: true,
    });
    const favoriteSong = await getFavoriteSongs();
    // this.setState({
    //   favoriteSong,
    // });
    const isFavorite = favoriteSong
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
  };

  favoriteSong = async () => {
    const { song } = this.props;
    const { isFavorite } = this.state;
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
      const time = await getFavoriteSongs();
      console.log(await time);
      this.setState({
        isFavorite: false,
        isLoading: false,
      });
      // console.log(this.state);
    }
  };

  render() {
    const { trackName, trackId, previewUrl } = this.props;
    const { isLoading, isFavorite } = this.state;

    if (isLoading) {
      return <h2>Carregando...</h2>;
    }
    return (
      <div className="musicList">

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
              type="checkbox"
              checked={ isFavorite }
              onChange={ () => this.favoriteSong(trackId) }

            />
          </label>
        </div>
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
