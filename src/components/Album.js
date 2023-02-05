import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
// import MusicCard from './MusicCard';

class Album extends React.Component {
  state = {
    infoAlbum: '',
    isLoading: true,
    listAlbumMusics: [],
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
      listAlbumMusics,
      isLoading: false,
    });
    // console.log(listAlbumMusics);
  };

  render() {
    // const { match: { params: { id } } } = this.props;
    const { isLoading, listAlbumMusics, infoAlbum } = this.state;
    // console.log({ id });
    console.log(listAlbumMusics);
    // console.log(this.getMusicsFromAlbum({ id }));

    if (isLoading) {
      return <h2>Carregando...</h2>;
    }
    return (
      <div data-testid="page-album">
        <Header />
        {/* <MusicCard /> */}
        Página do Album
        <div>
          <h2
            data-testid="artist-name"
          >
            nome do artista aqui
            { infoAlbum.artistName }
          </h2>
          <h2
            data-testid="album-name"
          >
            nome do Album aqui
            { infoAlbum.collectionName}
          </h2>
        </div>

        {/* {
          listAlbumMusics.map((music, index) => (
            <div key={ index }>
              <h2
                data-testid="artist-name"
              >
                nome do artista aqui
                { music.artistName }
              </h2>
              <h2
                data-testid="album-name"
              >
                nome do Album aqui
                { music.collectionName}
              </h2>
            </div>
          ))
        } */}

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
