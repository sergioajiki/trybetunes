import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Header.css';

class Header extends React.Component {
  state = {
    name: '',
    isLoading: true,
  };

  componentDidMount() {
    this.recoverLocalStorage();
  }

  recoverLocalStorage = async () => {
    const info = await getUser();
    // console.log(info.name);
    this.setState({
      name: info.name,
      isLoading: false,
    });
  };

  render() {
    // console.log(await this.recoverLocalStorage());
    const { isLoading, name } = this.state;
    if (isLoading) {
      return <h2>Carregando...</h2>;
    }
    return (
      <header data-testid="header-component" className="header">
        <span className="title">
          trybe
          <br />
          tunes
        </span>
        <div className="links">
          <Link
            data-testid="link-to-search"
            to="/search"
          >
            Pesquisar
          </Link>
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritos
          </Link>
          <Link
            data-testid="link-to-profile"
            to="/profile"
          >
            Perfil
          </Link>
        </div>
        <div data-testid="header-user-name">
          <p>
            Usuário
            { ' ' }
            { name }
          </p>

          {/* <p>{ name }</p> */}
        </div>
      </header>
    );
  }
}

export default Header;
