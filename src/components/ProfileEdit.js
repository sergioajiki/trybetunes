import React from 'react';
import { getUser } from '../services/userAPI';
import Header from './Header';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
  };

  componentDidMount() {
    this.recoverUserFromLocalStorage();
  }

  recoverUserFromLocalStorage = async () => {
    const user = await getUser();
    const { name, email, image, description } = user;
    console.log(user);
  };

  render() {
    const { name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        Página do ProfileEdit
        <form>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="edit-input-name"
              type="text"
              id="name"
              value={ name }
              onChange={ () => console.log('clicou no nome') }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              data-testid="edit-input-email"
              type="email"
              id="email"
              value={ email }
              onChange={ () => console.log('clicou no email') }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="edit-input-description"
              type="text"
              id="description"
              value={ description }
              onChange={ () => console.log('clicou na descrição') }
            />
          </label>
          <label htmlFor="image">
            Foto:
            <input
              data-testid="edit-input-image"
              type="text"
              id="image"
              value={ image }
              onChange={ () => console.log('clicou na imagem') }
            />
          </label>
          <button
            data-testid="edit-button-save"
          >
            Salvar
          </button>

        </form>
      </div>

    );
  }
}

export default ProfileEdit;
