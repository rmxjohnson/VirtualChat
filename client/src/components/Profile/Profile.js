import React from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';
import SelectUSState from 'react-select-us-states';
import "./Profile.css";
import Footer from '../Footer/Footer';


export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.initialState = {
            age: props.location.state.age,
            user: props.location.state.user,
            email: props.location.state.email,
            password: props.location.state.password,
            yourname: props.location.state.yourname,
            city: props.location.state.city,
            yourstate: props.location.state.yourstate,
            profilepic: props.location.state.profilepic,
            isUpdateButtonDisabled: false,
            redirectToChat: false,
            redirectToLogin: false
        };

        // set state to the initial state
        this.state = this.initialState;
    }

    // handle changes on form fields
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    // handle change for state dropdown
    handleChangeUSState = (event) => {
        const value = event;

        this.setState({ yourstate: value });
    }

    // reset fields to initial values when 'Cancel'
    resetFields = () => {
        this.setState(this.initialState);
    }

    // when user selects "Update Profile"
    onSubmit = (event) => {
        event.preventDefault();

        //disable the update button
        this.setState({
            isUpdateButtonDisabled: true
        });

        // route to update profile
        axios({
            url: '/updateprofile',
            method: 'POST',
            data: {
                user: this.state.user,
                email: this.state.email,
                yourname: this.state.yourname,
                age: this.state.age,
                city: this.state.city,
                yourstate: this.state.yourstate,
                profilepic: this.state.profilepic
            }
        })

            .then((response) => {

                // Successful update message
                alert(response.data.message);

                // enable the update button
                this.setState({
                    isUpdateButtonDisabled: false
                });

                // reset the initial state to the current updated state
                this.initialState = this.state;

            })
            .catch((err) => {
                alert('Error in profile update request');
            });
        (() => {
            ("h1").lettering();
        });

    }

    // set flag for redirect to community chat
    gotoChat = () => {
        this.setState({
            redirectToChat: true
        });
    }

    deleteProfile = () => {

        const choice = window.confirm("Are you sure you want to delete your profile?");

        if (choice == true) {
            var currentUser = this.state.email;
            axios.get(`/deleteprofile/${currentUser}`)
                .then((res) => {
                    alert("Successfully Deleted Profile")

                    // set validLoggin to redirect to community chat page
                    this.setState({ redirectToLogin: true });

                })
                .catch(function (error) {
                    alert("Error Deleting Profile")
                    console.log('Error deleting the profile', error);
                    console.log('deleting profile error response= ', error.response.data.message);
                });
        } else {
            // Do nothing!
        }
    }


    render() {
        // if boolean is true, redirect to the community chat page
        if (this.state.redirectToChat) {
            // send user profile info to community chat page
            var profile = this.state;

            return (<Redirect to={{
                pathname: '/chat',
                state: profile
            }} />);
        }

        if (this.state.redirectToLogin) {

            return (<Redirect to={{
                pathname: '/login'
            }} />);
        }



        return (
            <div className="profile-back">

                <button className="GotoChatBtn" type="button" onClick={this.gotoChat} >GoTo Chat</button>
                <button className="DelProfBtn" type="button" onClick={this.deleteProfile} >Delete Profile</button>
                <div id="page-wrap">
                    <div className="badge" >
                        <h1><span className="char1">Y</span><span className="char2">o</span><span className="char3">u</span><span className="char4">r</span><span className="char5"></span><span className="char6">P</span><span className="char7">r</span><span className="char8">o</span><span className="char9">f</span><span className="char10">i</span><span className="char11">l</span><span className="char12">e</span></h1>

                    </div>
                </div>
                <form onSubmit={this.onSubmit} id="profile-form">
                    <div>
                        <div>
                            <img alt='profile-picture' className="ProfilePicture" src={this.state.profilepic} style={{ height: 100, width: 100 }} />
                        </div>

                        <div>
                            <label className="labelProfile" htmlFor="">Profile Pic</label>
                            <br />
                            <input type="string" className="profileInput" name='profilepic' placeholder='profile image' value={this.state.profilepic} required onChange={this.handleChange} />

                        </div>

                        <input type="email" className="profileInput" name='email' placeholder='email' defaultValue={this.state.email} disabled />
                    </div>

                    <div>
                        <label className="labelProfile" htmlFor="">Display Name</label>
                        <br />
                        <input type="text" className="profileInput" name='user' placeholder='Display Name' value={this.state.user} required onChange={this.handleChange} />
                    </div>

                    <div>
                        <label className="labelProfile" htmlFor="">Your Name</label>
                        <br />
                        <input type="text" className="profileInput" name='yourname' placeholder='Your Name (First and Last)' value={this.state.yourname} required onChange={this.handleChange} />
                    </div>
                    <div>
                        <label id='AGEProfile' className="labelProfile" htmlFor="">Age</label>
                        <br />
                        <input type="number" className="profileInput" name='age' placeholder='age' value={this.state.age} required onChange={this.handleChange} />
                    </div>
                    <div>
                        <label id='CITYProflie' className="labelProfile" htmlFor="">City</label>
                        <br />
                        <input type="string" className="profileInput" name='city' placeholder='city' value={this.state.city} required onChange={this.handleChange} />
                    </div>
                    <div>
                        <label className="labelProfile" htmlFor="">Your State</label>
                        <br />
                        <input type="string" className="profileInput" name='yourstate' placeholder='state' value={this.state.yourstate} required disabled onChange={this.handleChangeUSState} />
                        <br />
                        <label htmlFor="" className="labelProfile">Modify your State Below</label>
                        <br />
                        <SelectUSState id="myId1" className="profileInput" placeholder="State" required onChange={this.handleChangeUSState} />
                        <br />
                    </div>

                    <a className='SignOutProfile' href="/login">Sign Out!!</a>
                    <button className="UpdateProfileBtn" disabled={this.state.isUpdateButtonDisabled}>Update Profile</button><button type="button" onClick={this.resetFields} className="ProfileCancelBtn">Cancel</button>

                </form>

                <Footer />
            </div>
        );
    }
}