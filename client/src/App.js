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
//import BubbleFun1 from './components/BubbleFun/BubbleFun';

// function DummyComponent() {
//   return <h2>Hello World</h2>;
// }

// function DummyComponent1() {
//   return <h2>About - welcome to my app</h2>;
// }

// ProtectedRoute does not work
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

  // componentDidMount = () => {
  //   //Fetch
  //   fetch('/about')
  //     .then((data) => data.json())
  //     .then(function (data) {
  //       console.log('Data: ', data);
  //     })

  //     .catch(() => {

  //     });


  // };

  render() {
    return (
      <div className="App">
        {/* <BubbleFun1 /> */}
        {/* <Route exact path='/' component={DummyComponent} />
        <Route exact path='/about' component={DummyComponent1} /> */}
        {/* <Route exact path='/' component={DummyComponent} /> */}
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/chat' component={Chat} />
        {/* <PrivateRoute path='/profile' component={Profile} /> */}

      </div>
    );
  }
}

export default App;
