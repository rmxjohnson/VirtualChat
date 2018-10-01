import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router'
import axios from 'axios';
import SelectUSState from 'react-select-us-states';
import "./Profile.css";
import Footer from '../Footer/Footer';
import Navbar2 from '../Navbar2/Navbar2';

export default class Profile extends React.Component {

    // componentDidMount = () => {

    // }



    constructor(props) {
        super(props);
        this.initialState = {
            age: props.location.state.age,
            displayname: props.location.state.displayname,
            email: props.location.state.email,
            password: props.location.state.password,
            yourname: props.location.state.yourname,
            city: props.location.state.city,
            yourstate: props.location.state.yourstate,
            profilepic: props.location.state.profilepic,
            isUpdateButtonDisabled: false,
            redirectToChat: false
        };

        // set state to the initial state
        this.state = this.initialState;
        // this.state = { ...this.initialState };
        // const originalState = this.state;
        console.log("In the constructor", this.props.location) //undefined

        console.log("name ", this.props.location.state.displayname);
        console.log("email ", this.props.location.state.email);
        console.log("password ", this.props.location.state.password);
        console.log("yourname ", this.props.location.state.yourname);
        console.log("city ", this.props.location.state.city);
        console.log("age ", this.props.location.state.age);
        console.log("yourstate ", this.props.location.state.yourstate);
        console.log("profilepic ", this.props.location.state.profilepic);

        // console.log("Original State = ", originalState);
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    handleChangeUSState = (event) => {
        console.log("us state event : ", event);
        // const name = event.target.name;
        // console.log("Handle Change name ", name);
        const value = event;
        console.log("Handle change state Value: ", value);

        this.setState({ yourstate: value });
        // console.log('Changing State of residence: ', this.state);
    }

    // reset fields to initial values when 'Cancel'
    resetFields = () => {
        // event.preventDefault();
        console.log("I am in reset fields");
        console.log('Initial State = ', this.initialState);
        console.log('Initial State displayname= ', this.initialState.displayname);
        this.setState(this.initialState);
    }

    // when user selects "Update Profile"
    onSubmit = (event) => {
        event.preventDefault();

        //disable the update button
        this.setState({
            isUpdateButtonDisabled: true
        });

        console.log("data to submit to change profile", this.state);

        // route to update profile
        axios({
            url: '/updateprofile',
            method: 'POST',
            data: {
                displayname: this.state.displayname,
                email: this.state.email,
                yourname: this.state.yourname,
                age: this.state.age,
                city: this.state.city,
                yourstate: this.state.yourstate,
                profilepic: this.state.profilepic
            }
        })

            .then((response) => {
                console.log("response modified", response);

                console.log(' Response.data.status', response.status);

                alert(response.data.message);
                console.log("Change Profile Response = ", response);
                console.log("Change profile message = ", response.data.message);

                // enable the update button
                this.setState({
                    isUpdateButtonDisabled: false
                });

                // reset the initial state to the current state
                this.initialState = this.state;
                console.log("New Initial State = ", this.initialState);
            })
            .catch((err) => {
                console.log('catch error', err);
                alert('Error in profile change  Request');
            });
    }

    gotoChat = () => {
        // event.preventDefault();
        console.log("I am in goto chat function from the profile page");



        this.setState({
            redirectToChat: true
        });
    }



    render() {
        if (this.state.redirectToChat) {
            var profile = this.state;
            console.log("State In the IF statement of the profile page", this.state);

            console.log("variable profile In the IF statement of the profile page", profile);
            // if valid LogIn, redirect to the profile page
            return (<Redirect to={{
                //pathname: '/profile',
                pathname: '/chat',
                state: profile
            }} />);
        }


        // console.log("Original State = ", originalState);
        console.log("I am in the profile page");
        console.log("profile props = ", this.props.location.state.profile);
        console.log('Render State: ', this.state);
        return (
            <div className="profile-back">
                {/* <h2>Profile Component</h2>
                <Link to='/'>Go to Home</Link>
                <br />
                <Link to='/login'>Go to Login</Link>
                <br />
                <Link to='/signup'>Go to SignUp</Link> */}
                <Navbar2 id="profile-nav"></Navbar2>
                <h1 className="profile-logo">Your Profile</h1>
                {/* <form>
                    <div>
                        <label htmlFor=""></label>
                        <input type="email">
                    </div>
                </form>  */}
                {/* <h2>profile Form</h2> */}
                <form onSubmit={this.onSubmit} id="profile-form">
                    <div>
                        {/* <label htmlFor="">Email</label>
                        <br /> */}
                        <input type="email" name='email' placeholder='email' defaultValue={this.state.email} disabled />
                    </div>
                    {/* <div>
                        <label htmlFor="">Password</label>
                        <input type="password" name='password' placeholder='password' defaultValue={this.state.password} disabled />
                    </div> */}
                    <div>
                        <label htmlFor="">Display Name</label>
                        <br />
                        <input type="text" name='displayname' placeholder='Display Name' value={this.state.displayname} required onChange={this.handleChange} />
                    </div>

                    <div>
                        <label htmlFor="">Your Name</label>
                        <br />
                        <input type="text" name='yourname' placeholder='Your Name (First and Last)' value={this.state.yourname} required onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="">Age</label>
                        <br />
                        <input type="number" name='age' placeholder='age' value={this.state.age} required onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="">City</label>
                        <br />
                        <input type="string" name='city' placeholder='city' value={this.state.city} required onChange={this.handleChange} />
                    </div>
                    <div>

                        <label htmlFor="">Your State</label>
                        <br />
                        <input type="string" name='yourstate' placeholder='state' value={this.state.yourstate} required disabled onChange={this.handleChangeUSState} />
                        <br />
                        <label htmlFor="">Update your State</label>
                        <br />
                        <SelectUSState id="myId" className="myClassName" placeholder="State" required onChange={this.handleChangeUSState} />
                        <br />
                    </div>

                    <div>
                        <label htmlFor="">Profile Pic (url only)</label>
                        <br />
                        <input type="string" name='profilepic' placeholder='profile image' value={this.state.profilepic} required onChange={this.handleChange} />
                        <div>
                            <img alt='profile-picture' src={this.state.profilepic} style={{ height: 100, width: 100 }} />
                        </div>

                    </div>
                    <button disabled={this.state.isUpdateButtonDisabled}>Update Profile</button><button type="button" onClick={this.resetFields} >Cancel</button>
                    <button className="gotoChat" type="button" onClick={this.gotoChat} >GoTo Chat</button>
                </form>
                <Footer></Footer>
            </div>
        );
    }
}