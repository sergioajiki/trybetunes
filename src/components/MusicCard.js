import React from 'react';
// import Header from './Header';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    favoriteCheck: '',
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  favoriteSongChecked = async () => {
    this.setState({
      isLoading: true,
    });
    await addSong();
  };

  render() {
    const { albumSongList } = this.props;
    const { isLoading, favoriteCheck } = this.state;
    if (isLoading) {
      return <h2>Carregando...</h2>;
    }
    return (
      <div>
        Lista de musicas
        {
          albumSongList.map((song, index) => (
            <div key={ index }>
              <span>
                { song.trackName }
                <audio data-testid="audio-component" src={ song.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
              </span>
              <label htmlFor="favoriteCheck">
                <input
                  data-testid={ `checkbox-music-${song.trackId}` }
                  id="favoriteCheck"
                  name="favoriteCheck"
                  type="checkbox"
                  checked={ this.favoriteSongChecked() }
                  onChange={ this.onInputChange }
                />
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  albumSongList: PropTypes.arrayOf(
    PropTypes.shape({
      trackName: PropTypes.string,
      previewUrl: PropTypes.string,
    }),
  ).isRequired,
};

export default MusicCard;
