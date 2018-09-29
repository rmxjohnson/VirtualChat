import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SelectUSState from 'react-select-us-states';
import ImageUploader from 'react-images-upload';
//import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';


export default class Signup extends React.Component {
    state = {
        displayname: '',
        email: '',
        password: '',
        yourname: '',
        age: '',
        city: '',
        yourstate: 'OH',
        profilepic: '',
        isSubmitButtonDisabled: false,
        pictures: []
    };

    // constructor(props) {
    //     super(props);

    //     this.onDrop = this.onDrop.bind(this);
    // }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    // componentDidMount = () => {

    // }

    // constructor(props) {
    //     super(props);

    //     this.setNewValue = this.setNewValue.bind(this);
    // }

    // setNewValue(newValue) {
    //     console.log('this is the State code:' + newValue);
    // }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    handleChangeUSState = (event) => {
        console.log("event : ", event);
        // const name = event.target.name;
        // console.log("Handle Change name ", name);
        const value = event;
        console.log("Handle change Value: ", value);

        this.setState({ yourstate: value });
        // console.log('Changing State of residence: ', this.state);
    }

    clearFields = () => {
        // event.preventDefault();
        console.log("I am in clear fields");
        document.getElementById("signup-form").reset();
        this.setState({
            displayname: '',
            email: '',
            password: '',
            yourname: '',
            age: '',
            city: '',
            yourstate: 'OH',
            profilepic: '',
            // pictures: []
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        this.setState({
            isSubmitButtonDisabled: true
        });

        console.log("data to submit", this.state);

        axios({
            url: '/signup',
            method: 'POST',
            data: {
                displayname: this.state.displayname,
                email: this.state.email,
                password: this.state.password,
                yourname: this.state.yourname,
                age: this.state.age,
                city: this.state.city,
                yourstate: this.state.yourstate,
                profilepic: this.state.profilepic,
                // pictures: this.state.pictures
            }
        })

            .then((response) => {
                console.log("response modified", response);

                console.log(' Response.data.status', response.data.status);
                switch (response.data.status) {
                    // console.log(' Response.data.status', response.status);
                    // switch (response.status) {
                    case 200:
                        alert('SignUp Successful');
                        // this.setState({
                        //     isSubmitButtonDisabled: false
                        // });
                        this.clearFields();
                        console.log("After ClearFields");
                        break;
                    case 500:
                        alert('Invalid field values. ');
                        break;
                    default:
                        alert('Other status: ', response.data.status);
                }
                this.setState({
                    isSubmitButtonDisabled: false
                });

                alert('SignUp Request was successful');
                console.log("SignUp Response = ", response);
            })
            .catch((err) => {
                console.log('catch error', err);
                alert('Error in SignUp Request');
                this.setState({
                    isSubmitButtonDisabled: false
                });
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
                    <br />
                    <Link to='/profile'>Go to Profile</Link>
                    <h2>SignUp Form</h2>
                    <form onSubmit={this.onSubmit} id="signup-form">
                        <div>
                            <label htmlFor=""></label>
                            <input type="email" name='email' placeholder='email (used for log-in)' required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor=""></label>
                            <input type="password" name='password' placeholder='password' required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor=""></label>
                            <input type="text" name='displayname' placeholder='Display Name' required onChange={this.handleChange} />
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
                            {/* <input type="string" name='yourstate' placeholder='state' required onChange={this.handleChange} /> */}
                            <SelectUSState id="myId" className="myClassName" required onChange={this.handleChangeUSState} />



                        </div>

                        {/* <div>
                            <p>Something here</p>
                            <ImageUploader
                                withIcon={true}
                                withPreview={true}
                                buttonText='Choose Profile Picture'
                                onChange={this.onDrop}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                singleImage={true}
                            />
                        </div> */}
                        <div>
                            <label htmlFor=""></label>
                            <input type="string" name='profilepic' placeholder='profile image (must be url)' required onChange={this.handleChange} />
                            {/* <ImagesUploader
                                url="http://localhost:3000/notmultiple"
                                optimisticPreviews
                                multiple={false}
                                onLoadEnd={(err) => {
                                    if (err) {
                                        console.error(err);
                                    }
                                }}
                                label="Upload a picture"
                            /> */}
                        </div>
                        <button disabled={this.state.isSubmitButtonDisabled}>Submit</button><button type="button" onClick={this.clearFields}>Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}