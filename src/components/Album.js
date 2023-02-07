import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import './Album.css';

class Album extends React.Component {
  state = {
    infoAlbum: '',
    isLoading: true,
    albumSongList: '',
  };

  componentDidMount() {
    this.getMusicsFromAlbum();
  }

  getMusicsFromAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const listAlbumMusics = await getMusics(id);
    const filterOnlyMusic = listAlbumMusics.filter((music) => (
      music.kind === 'song'
    ));
    this.setState({
      infoAlbum: listAlbumMusics[0],
      isLoading: false,
      albumSongList: filterOnlyMusic,

    });
  };

  render() {
    const {
      isLoading,
      albumSongList,
      infoAlbum,
    } = this.state;

    if (isLoading) {
      return <h2>Carregando...</h2>;
    }
    return (
      <div data-testid="page-album">
        <Header />
        Página do Album
        <div className="infoArtist">
          <span className="albumTitle">
            <h2
              data-testid="artist-name"
            >
              Artist Name
              { infoAlbum.artistName }
            </h2>
          </span>
          <span className="artistTitle">
            <h2
              data-testid="album-name"
            >
              Collection Name
              { infoAlbum.collectionName}
            </h2>
          </span>
        </div>
        <div>
          {
            albumSongList.map((song) => (
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
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
