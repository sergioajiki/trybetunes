import React from 'react';
import { getUser } from '../services/userAPI';
import Header from './Header';

class Profile extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    // isLoading: true,
  };

  componentDidMount() {
    // this.recoverUserFromLocalStorage();
  }

  recoverUserFromLocalStorage = async () => {
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState({
      name,
      email,
      image,
      description,
      // isLoading: false,
    });
    // console.log(user);
  };

  render() {
    this.recoverUserFromLocalStorage();
    const { name, email, image, description } = this.state;
    // if (isLoading) {
    //   return <h2>Carregando...</h2>;
    // }

    return (

      <div data-testid="page-profile">
        <Header />
        Página do Profile
        <div />
        <div>
          Nome:
          { name }
        </div>
        <div>
          Email:
          { email }
        </div>
        <div>
          <img
            data-testid="profile-image"
            src={ image }
            alt={ name }
          />
        </div>
        <div>
          description:
          { description }
        </div>
      </div>
    );
  }
}

export default Profile;
