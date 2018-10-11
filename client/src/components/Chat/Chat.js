import React from 'react';
import './Chat.css';
import { Redirect } from 'react-router'
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import io from 'socket.io-client';
import { USER_CONNECTED } from '../../Events';
import ChatContainer from "../chats/ChatContainer";
import BubbleFun1 from '../BubbleFun/BubbleFun';


//const socketUrl = "http://localhost:9000";
//  needed to deploy to heroku
const socketUrl = "/";

export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {
                age: props.location.state.age,
                user: props.location.state.user,
                email: props.location.state.email,
                password: props.location.state.password,
                yourname: props.location.state.yourname,
                city: props.location.state.city,
                yourstate: props.location.state.yourstate,
                profilepic: props.location.state.profilepic
            },
            redirectToProfile: false,
            socket: null,
            user: props.location.state.user
        }
    };

    componentDidMount = () => {
        const socket = this.state.socket;
        socket.emit('VERIFY_USER', this.state.user, this.verifyUser)
    };

    // set flag to redirect to profile page
    gotoProfile = () => {
        this.setState({
            redirectToProfile: true
        });
    }

    componentWillMount() {
        this.initSocket()
    }

    verifyUser = ({ user, isUser }) => {

        if (isUser) {
            // this.setError("User name taken")
        } else {
            this.setUser(user)
        }
    }


    initSocket = () => {
        const socket = io(socketUrl)

        socket.on('connect', () => {
            console.log("Connected from chat");
        })

        this.setState({ socket })
    }


    setUser = (user) => {
        const { socket } = this.state
        socket.emit(USER_CONNECTED, user);
    }


    // logout = () => {
    //     const { socket } = this.state
    //     socket.emit(LOGOUT)
    //     this.setState({ user: null })
    // }

    render() {
        if (this.state.redirectToProfile) {

            // if valid LogIn, redirect to the profile page
            return (<Redirect to={{
                pathname: '/profile',
                state: this.state.profile
            }} />);
        }
        return (
            <div>
                <Navbar></Navbar>
                <button className="gotoProfile" type="button" onClick={this.gotoProfile} >GoTo Profile</button>
                <ChatContainer socket={this.state.socket} user={this.state.user} logout={this.logout} />
                <Footer></Footer>
            </div>
        );
    }
}