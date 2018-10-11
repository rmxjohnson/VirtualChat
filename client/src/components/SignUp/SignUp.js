import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
import SelectUSState from 'react-select-us-states';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import "./Signup.css";
import BigLogo1 from '../BigLogo/BigLogo';
import BubbleFun1 from '../BubbleFun/BubbleFun';


export default class Signup extends React.Component {
    state = {
        user: '',
        email: '',
        password: '',
        yourname: '',
        age: '',
        city: '',
        yourstate: '',
        profilepic: '',
        isSubmitButtonDisabled: false,
        pictures: [],
        redirectToLogin: false
    };


    // handle changes on form fields
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    // handle change on the states dropdown
    handleChangeUSState = (event) => {
        const value = event;
        this.setState({ yourstate: value });
    }

    // clear the form fields
    clearFields = () => {
        console.log("I am in clear fields");
        document.getElementById("signup-form").reset();
        this.setState({
            user: '',
            email: '',
            password: '',
            yourname: '',
            age: '',
            city: '',
            yourstate: 'OH',
            profilepic: ''
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            isSubmitButtonDisabled: true
        });

        // signup route
        axios({
            url: '/signup',
            method: 'POST',
            data: {
                user: this.state.displayname,
                email: this.state.email,
                password: this.state.password,
                yourname: this.state.yourname,
                age: this.state.age,
                city: this.state.city,
                yourstate: this.state.yourstate,
                profilepic: this.state.profilepic
            }
        })

            .then((response) => {
                switch (response.data.status) {
                    case 200:
                        // alert('SignUp Successful');

                        // set boolean for redirectToLogin page
                        this.setState({ redirectToLogin: true });
                        break;
                    case 500:
                        alert('Email already used.  Enter a different email');
                        break;
                    default:
                        alert('Other status: ', response.data.status);
                }
                this.setState({
                    isSubmitButtonDisabled: false
                });


            })
            .catch((err) => {
                alert('Error in SignUp Request');
                this.setState({
                    isSubmitButtonDisabled: false
                });
            });

    }

    render() {


        if (this.state.redirectToLogin) {

            return (<Redirect to={{
                pathname: '/login'
            }} />);
        }

        return (
            <div>
                <Navbar />
                <div>
                    <form className="SIGNUP" onSubmit={this.onSubmit} id="signup-form">

                        <div>
                            <label htmlFor=""></label>
                            <input type="email" className="SignUpInput " name='email' placeholder='Email (Your Login Id)' required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor=""></label>
                            <input type="password" className="SignUpInput" name='password' placeholder='Password' required onChange={this.handleChange} />
                        </div>
                        <div >
                            <label htmlFor=""></label>
                            <input type="text" className="SignUpInput" name='displayname' placeholder='Display Name' required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor=""></label>
                            <input type="text" className="SignUpInput" name='yourname' placeholder='Your Name (First and Last)' required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor=""></label>
                            <input type="number" className="SignUpInput" name='age' placeholder='Age' required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor=""></label>
                            <input type="string" className="SignUpInput" name='city' placeholder='City' required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label id="SS" htmlFor="">Select a State</label>
                            <br />

                            <SelectUSState id="myId" className="SignUpInput" placeholder="State" required onChange={this.handleChangeUSState} />
                            <BubbleFun1 />
                            <BigLogo1 />

                        </div>

                        <div>
                            <label htmlFor=""></label>
                            <input type="string" className="SignUpInput" name='profilepic' placeholder='Profile URL Image' required onChange={this.handleChange} />
                            <div>
                                <img alt='profile-picture' className='SignUpPP' src={this.state.profilepic} style={{ height: 100, width: 100 }} />
                            </div>

                        </div>
                        <button id="SignUpSubmit" disabled={this.state.isSubmitButtonDisabled}>Submit</button><button type="button" id="SignUpCancel" onClick={this.clearFields}>Cancel</button>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}