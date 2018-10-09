import React from 'react';
import { Redirect } from 'react-router'
//import { Link, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";
//import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import BigLogo1 from '../BigLogo/BigLogo';
import BubbleFun1 from '../BubbleFun/BubbleFun';

export default class Login extends React.Component {

    state = {
        email: '',
        password: '',
        validLoggin: false,
        profile: {},

        isSubmitButtonDisabled: false


    };

    // componentDidMount = () => {

    // }
    // componentDidUpdate = (prevprops, prevstate) => {
    //     if ((prevstate.validLoggin !== this.state.validLoggin) && this.state.validLoggin) {
    //         <Redirect to='/profile' />;
    //     }

    // }

    // handleSignUp() {
    //     window.location = "/signup";
    // }


    // handle change on input fields
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    // handle submit
    onSubmit = (event) => {
        event.preventDefault();
        const email = this.state.email;
        //const password = this.state.password;

        // disable the Submit button
        this.setState({
            isSubmitButtonDisabled: true
        });

        // login route
        axios({
            url: '/login',
            method: 'POST',
            data: {
                email: this.state.email,
                password: this.state.password
            }
        })
            .then((response) => {
                // alert('It is working, you are logged in');
                // console.log('Login Response = ', response);
                // console.log("login response.data = ", response.data)
                this.setState({
                    isButtonDisabled: false
                });

                // on valid login, get the user's profile
                axios.get(`/profile/${email}`)
                    .then((res2) => {
                        //  console.log("Profile info");
                        // console.log(res2);

                        // set validLoggin to redirect to community chat page
                        this.setState({ validLoggin: true, profile: res2.data });

                        //  console.log("loggin boolean", this.state.validLoggin)
                    })
                    .catch(function (error) {
                        console.log('Error getting the profile on login', error);
                        console.log('getting profile error response= ', error.response.data.message);
                    });
            })
            .catch((err) => {
                // Error on LogIn
                this.setState({
                    isSubmitButtonDisabled: false
                });
                alert(err.response.data.message);
                // console.log('login error = ', err);
                // console.log('login error response= ', err.response.data.message);
                // console.log("error message", err.message);
            });
    }



    render() {

        // console.log('State: ', this.state);
        // redirect to community chat if valid loggin
        if (this.state.validLoggin) {
            // console.log("In the IF statement", this.state.profile);

            return (<Redirect to={{
                pathname: '/chat',
                state: this.state.profile
            }} />);
        }
        return (
            <div>
                <Navbar />
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <label htmlFor=""></label>
                            <input className="LoginInput" type="email" name='email' placeholder='email (for log-in)' onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor=""></label>
                            <input className="LoginInput" type="password" name='password' placeholder='password' onChange={this.handleChange} />
                        </div>
                        <button className="LogInSubmitBtn" disabled={this.state.isSubmitButtonDisabled}>Submit</button>
                        <br />
                    </form>

                    <BigLogo1 />
                    <BubbleFun1 />
                </div>
                <Footer />
            </div>
        );
    }
}