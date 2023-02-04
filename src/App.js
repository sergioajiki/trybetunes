import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import Album from './components/Album';
// import Favorites from './components/Favorites';
// import Login from './components/Login';
// import NotFound from './components/NotFound';
// import Profile from './components/Profile';
// import ProfileEdit from './components/ProfileEdit';
// import Search from './components/Search';
import Routes from './components/Routes';

class App extends React.Component {
  render() {
    return (
      <>
        <p>My TrybeTunes ta no app</p>
        <Routes />
      </>
    );
  }
}

export default App;
/* <Route path="/about" component={ About } /> */
