import React from 'react';

class Header extends React.Component {
  state = {
    name: '',
    isLoading: true,
  };

  componentDidMount() {
    const itemLocalStorage = localStorage.getItem('name');
    if (itemLocalStorage) {
      this.setState({
        name: itemLocalStorage,
        isLoading: false,
      });
    }
    console.log(itemLocalStorage);
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <h2>Carregando...</h2>;
    }
    return (
      <header data-testid="header-component">
        Componente Header
        <div data-testid="header-user-name">
          resultado da função
        </div>
      </header>
    );
  }
}

export default Header;
