import React from 'react';
import { getUser } from '../services/userAPI';

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
    console.log(info.name);
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
      <header data-testid="header-component">
        Componente Header
        <div data-testid="header-user-name">
          resultado da função
          { name }
        </div>
      </header>
    );
  }
}

export default Header;
