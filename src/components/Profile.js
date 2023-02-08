import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';

class Profile extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: false,
  };

  componentDidMount() {
    this.loading();
    // this.recoverUserFromLocalStorage();
  }

  loading = () => {
    this.setState({
      isLoading: true,
    }, () => this.recoverUserFromLocalStorage());
    this.setState({
      isLoading: false,
    });
  };

  recoverUserFromLocalStorage = async () => {
    const user = await getUser();
    console.log(user);
    const { name, email, image, description } = user;
    this.setState({
      name,
      email,
      image,
      description,
      // isLoading: false;
    });

    // console.log(user);
  };

  render() {
    // this.recoverUserFromLocalStorage();
    const { name, email, image, description, isLoading } = this.state;

    if (isLoading) {
      return <h2>Carregando...</h2>;
    }

    return (

      <div data-testid="page-profile">
        <Header />
        Página do Profile
        <div />

        <div>

          <div>
            Nome:
            <p>{ name }</p>
          </div>

          <div>
            Email:
            <p>{ email }</p>
          </div>
          {/* <p>{ name }</p> */}
          <div>
            <img
              data-testid="profile-image"
              src={ image }
              alt={ `imagem de ${name}` }
            />
          </div>

          <div>
            description:
            <p>{ description }</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        </div>

      </div>

    );
  }
}

export default Profile;
