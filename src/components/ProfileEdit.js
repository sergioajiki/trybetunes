import React from 'react';
import Proptypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from './Header';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: false,
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
      isLoading: false,
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

  uptadeUserInfo = async () => {
    this.setState({
      isLoading: true,
    });
    const { name, email, image, description } = this.state;
    const { history } = this.props;
    const updatedInfo = {
      name,
      email,
      image,
      description,
    };
    await updateUser(updatedInfo);
    this.setState({
      isLoading: false,
    });
    history.push('../profile');
  };

  render() {
    console.log(this.checkFields());
    const { name, email, image, description, isLoading } = this.state;
    if (isLoading) {
      return <h2>Carregando...</h2>;
    }
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
            onClick={ this.uptadeUserInfo }
          >
            Salvar
          </button>

        </form>
      </div>

    );
  }
}

ProfileEdit.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func,
  }).isRequired,
};
export default ProfileEdit;
