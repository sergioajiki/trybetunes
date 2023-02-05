import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
// import MusicCard from './MusicCard';

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
    // console.log({ id });
    const listAlbumMusics = await getMusics(id);
    this.setState({
      infoAlbum: listAlbumMusics[0],
      isLoading: false,
    });
    listAlbumMusics.shift();
    this.setState({
      albumSongList: listAlbumMusics,
    });

    // console.log(albumSongList);
  };

  render() {
    // const { match: { params: { id } } } = this.props;
    const {
      isLoading,
      albumSongList,
      infoAlbum,
    } = this.state;
    // console.log({ id });
    console.log(albumSongList);
    console.log(infoAlbum);
    // console.log(teste);
    // console.log(this.getMusicsFromAlbum({ id }));

    if (isLoading) {
      return <h2>Carregando...</h2>;
    }
    return (
      <div data-testid="page-album">
        <Header />
        Página do Album
        <div>
          <h2
            data-testid="artist-name"
          >
            Artist Name
            { infoAlbum.artistName }
          </h2>
          <h2
            data-testid="album-name"
          >
            Collection Name
            { infoAlbum.collectionName}
          </h2>
        </div>
        Lista de musicas
        {
          albumSongList.map((song, index) => (
            <div key={ index }>
              <p>
                { song.trackName }
                <audio data-testid="audio-component" src={ song.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento

                  <code>audio</code>
                  .
                </audio>
              </p>
            </div>
          ))
        }
        <div />
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
