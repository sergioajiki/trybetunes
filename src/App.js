import React from 'react';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <p>My TrybeTunes</p>
        <Route />
        <Route />
        <Route />
        <Route />
        <Route />
      </Switch>
    );
  }
}

export default App;
/* <Route path="/about" component={ About } /> */
