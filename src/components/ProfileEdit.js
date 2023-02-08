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

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  recoverUserFromLocalStorage = async () => {
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState({
      name,
      email,
      image,
      description,
    });
    console.log(user);
  };

  checkFields = () => {
    const { name, email, image, description } = this.state;
    return (
      name.length === 0
      || email.length === 0
      || image.length === 0
      || description === 0
    );
  };

  render() {
    console.log(this.checkFields());
    const { name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        Página do ProfileEdit
        <form>
          <label htmlFor="nameId">
            Nome:
            <input
              data-testid="edit-input-name"
              type="text"
              id="nameId"
              value={ name }
              name="name"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="emailId">
            Email:
            <input
              data-testid="edit-input-email"
              type="email"
              id="emailId"
              value={ email }
              name="email"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="descriptionId">
            Descrição:
            <input
              data-testid="edit-input-description"
              type="text"
              id="descriptionId"
              value={ description }
              name="description"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="image">
            Foto:
            <input
              data-testid="edit-input-image"
              type="text"
              id="image"
              value={ image }
              name="image"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            data-testid="edit-button-save"
            type="button"
            disabled={ this.checkFields() }
          >
            Salvar
          </button>

        </form>
      </div>

    );
  }
}

export default ProfileEdit;
