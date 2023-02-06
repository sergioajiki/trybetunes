import React from 'react';
// import Header from './Header';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import './MusicCard.css';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
  };

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  favoriteSong = async (song) => {
    console.log(typeof (song));
    this.setState({
      isLoading: true,
    });
    await addSong(song);
    this.setState({
      isLoading: false,

    });
  };

  // validateCheck = () => {

  // };

  render() {
    // console.log(() => this.recoverLocalhost());
    const { albumSongList } = this.props;
    const { isLoading } = this.state;
    if (isLoading) {
      return <h2>Carregando...</h2>;
    }
    return (
      <div className="musicList">
        Lista de musicas
        {
          albumSongList.map((song, index) => (
            <div key={ index } className="musicLine">
              <span className="musicLine">
                <p className="nameSong">
                  { song.trackName }
                </p>
                <audio data-testid="audio-component" src={ song.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
              </span>
              <label htmlFor={ song.trackId }>
                <input
                  data-testid={ `checkbox-music-${song.trackId}` }
                  id={ song.trackId }
                  name="favoriteCheck"
                  type="checkbox"
                  // checked=
                  // comparar o id com o id do localhost para confirmar se checked is true or false
                  // onChange={ () => console.log('Mudou o check') }
                  // onChange={ this.getCheckbox }
                  onChange={ () => this.favoriteSong(song.trackId) }
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
