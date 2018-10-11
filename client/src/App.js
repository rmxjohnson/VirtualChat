import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';


// import components
import Home from './components/Home/Home.js';
import Navbar from './components/Navbar/Navbar.js';
import Login from './components/Login/Login.js';
import SignUp from './components/SignUp/SignUp.js';
import Profile from './components/Profile/Profile.js';
import Chat from './components/Chat/Chat.js';

// ProtectedRoute - not used at this time
const ProtectedRoute = (props) => {
  // props: path & component

  const isAuthenticated = false;
  if (isAuthenticated === true) {
    return <Route path={props.path} component={props.component} />
  }
  return <Redirect to='/' />

}

//<ProtectedRoute path='' component={} />

const isAuthenticated = false;
const PrivateRoute = ({ component: Component, path: url }) => (

  <Route path={url} render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)



class App extends Component {


  render() {
    return (
      <div className="App">

        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/chat' component={Chat} />

      </div>
    );
  }
}

export default App;
