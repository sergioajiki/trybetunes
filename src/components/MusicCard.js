import React from 'react';
// import Header from './Header';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { albumSongList } = this.props;
    return (
      <div>
        Lista de musicas
        {
          albumSongList.map((song, index) => (
            <div key={ index }>
              <p>
                { song.trackName }
                <audio data-testid="audio-component" src={ song.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
              </p>
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
