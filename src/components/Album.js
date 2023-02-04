import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
// import MusicCard from './MusicCard';

class Album extends React.Component {
  getMusicsFromAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    console.log({ id });
    const listAlbumMusics = await getMusics(id);
    console.log(listAlbumMusics);
  };

  render() {
    const { match: { params: { id } } } = this.props;
    console.log({ id });
    console.log(this.getMusicsFromAlbum({ id }));
    return (
      <div data-testid="page-album">
        <Header />
        {/* <MusicCard /> */}
        Página do Album

        <h2 data-testid="artist-name">nome do artista aqui</h2>
        <h2 data-testid="album-name">nome do Album aqui</h2>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
