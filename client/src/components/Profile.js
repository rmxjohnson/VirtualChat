import React from 'react';
import { Link } from 'react-router-dom';


export default class Profile extends React.Component {

    // componentDidMount = () => {

    // }
    constructor(props) {
        super(props);
        this.state = {
            age: props.location.state.age,
            displayname: props.location.state.displayname,
            email: props.location.state.email,
            password: props.location.state.password,
            yourname: props.location.state.yourname,
            city: this.props.location.state.city,
            yourstate: props.location.state.yourstate,
            profilepic: props.location.state.profilepic

        }
        console.log("In the constructor", this.props.location) //undefined

        console.log("name ", this.props.location.state.displayname);
        console.log("email ", this.props.location.state.email);
        console.log("password ", this.props.location.state.password);
        console.log("yourname ", this.props.location.state.yourname);
        console.log("city ", this.props.location.state.city);
        console.log("age ", this.props.location.state.age);
        console.log("yourstate ", this.props.location.state.yourstate);
        console.log("profilepic ", this.props.location.state.profilepic);
    }


    render() {
        console.log("I am in the profile page");
        console.log("profile props = ", this.props.location.state.profile);
        return (
            <div>
                <h2>Profile Component</h2>
                <Link to='/'>Go to Home</Link>
                <br />
                <Link to='/login'>Go to Login</Link>
                <br />
                <Link to='/signup'>Go to SignUp</Link>
                {/* <form>
                    <div>
                        <label htmlFor=""></label>
                        <input type="email">
                    </div>
                </form>  */}
                <h2>profile Form</h2>
                <form id="profile-form">
                    <div>
                        <label htmlFor="">Display Name</label>
                        <input type="text" name='displayname' placeholder='Display Name' defaultValue={this.state.displayname} />
                    </div>
                    <div>
                        <label htmlFor="">email</label>
                        <input type="email" name='email' placeholder='email' defaultValue={this.state.email} disabled />
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input type="password" name='password' placeholder='password' defaultValue={this.state.password} />
                    </div>
                    <div>
                        <label htmlFor="">Your Name</label>
                        <input type="text" name='yourname' placeholder='Your Name (First and Last)' defaultValue={this.state.yourname} />
                    </div>
                    <div>
                        <label htmlFor="">Age</label>
                        <input type="number" name='age' placeholder='age' defaultValue={this.state.age} />
                    </div>
                    <div>
                        <label htmlFor="">City</label>
                        <input type="string" name='city' placeholder='city' defaultValue={this.state.city} />
                    </div>
                    <div>
                        <label htmlFor="">Select a State</label>
                        <br />
                        <input type="string" name='yourstate' placeholder='state' defaultValue={this.state.yourstate} />
                        {/* <SelectUSState id="myId" className="myClassName" required onChange={this.handleChangeUSState} /> */}



                    </div>

                    <div>
                        <label htmlFor="">Profile Pic</label>
                        <input type="string" name='profilepic' placeholder='profile image' defaultValue={this.state.profilepic} />
                        <div>
                            <img alt='my-picture' src={this.state.profilepic} />
                        </div>

                    </div>
                    <button>Submit</button><button type="button" >Cancel</button>
                </form>

            </div>
        );
    }
}