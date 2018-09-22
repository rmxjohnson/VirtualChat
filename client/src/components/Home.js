import React from 'react';
import { Link } from 'react-router-dom';


export default class Home extends React.Component {

    // componentDidMount = () => {

    // }


    render() {
        return (
            <div>
                <h2>Home Page</h2>
                <Link to='/login'>Go to Login</Link>
                <br />
                <Link to='/signup'>Go to SignUp</Link>
                <br />
                <Link to='/profile'>Go to Profile</Link>
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