import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import FriendsList from './components/FriendsList';
import { PrivateRoute } from './auth/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Route path="/login" component={Login}/>
      <PrivateRoute path='/friendslist' component={FriendsList} />
    </div>
  );
}

export default App;