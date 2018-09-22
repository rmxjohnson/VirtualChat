import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



export default class Login extends React.Component {
    state = {
        email: '',
        password: ''
    };

    // componentDidMount = () => {

    // }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;

        axios({
            url: '/login',
            method: 'POST',
            data: {
                email: this.state.email,
                password: this.state.password
            }
        })
            .then((response) => {
                alert('It is working, you are logged in');
                console.log('Login Response = ', response);
            })
            .catch((err) => {
                alert('Not able to log in - try again');
            });
    }

    render() {

        console.log('State: ', this.state);
        return (
            <div>

                <div>
                    <Link to='/'>Go to Home</Link>
                    <br />
                    <Link to='/signup'>Go to SignUp</Link>
                    <br />
                    <Link to='/profile'>Go to Profile</Link>
                    <h2>Login Form</h2>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <label htmlFor=""></label>
                            <input type="email" name='email' onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor=""></label>
                            <input type="password" name='password' onChange={this.handleChange} />
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}