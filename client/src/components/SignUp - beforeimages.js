import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SelectUSState from 'react-select-us-states';


export default class Signup extends React.Component {
    state = {
        displayname: '',
        email: '',
        password: '',
        yourname: '',
        age: '',
        city: '',
        yourstate: '',
        profilepic: ''
    };

    // componentDidMount = () => {

    // }

    constructor(props) {
        super(props);

        this.setNewValue = this.setNewValue.bind(this);
    }

    setNewValue(newValue) {
        console.log('this is the State code:' + newValue);
    }

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
            url: '/signup',
            method: 'POST',
            data: {
                email: this.state.email,
                password: this.state.password
            }
        })
            .then((response) => {
                alert('SignUp Successful')
                console.log("SignUp Response = ", response);
            })
            .catch((err) => {
                alert('Not able to SignUp - try again');
            });
    }

    render() {

        console.log('State: ', this.state);
        return (
            <div>

                <div>
                    <Link to='/'>Go to Home</Link>
                    <br />
                    <Link to='/login'>Go to Login</Link>
                    <h2>SignUp Form</h2>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <label htmlFor=""></label>
                            <input type="text" name='displayname' placeholder='Display Name' required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor=""></label>
                            <input type="email" name='email' placeholder='email' required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor=""></label>
                            <input type="password" name='password' placeholder='password' required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor=""></label>
                            <input type="text" name='yourname' placeholder='Your Name (First and Last)' required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor=""></label>
                            <input type="number" name='age' placeholder='age' required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor=""></label>
                            <input type="string" name='city' placeholder='city' required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="">Select a State</label>
                            <br />
                            {/* <input type="string" name='location' placeholder='state' required onChange={this.handleChange} /> */}

                            <SelectUSState name='yourstate' id="myId" className="myClassName" required onChange={this.setNewValue} />

                        </div>
                        <div>
                            <label htmlFor=""></label>
                            <input type="string" name='profilepic' placeholder='profile image' required onChange={this.handleChange} />
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}