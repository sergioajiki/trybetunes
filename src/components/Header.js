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
        Componente Header
        <div>Links</div>
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
        <div data-testid="header-user-name">
          Usuário
          { name }
        </div>
      </header>
    );
  }
}

export default Header;
