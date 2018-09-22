import React from 'react';
import { Link } from 'react-router-dom';


export default class Profile extends React.Component {

    // componentDidMount = () => {

    // }


    render() {
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
                </form> */}
            </div>
        );
    }
}