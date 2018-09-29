import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';


export default class Home extends React.Component {


    render() {
        return (
            <div>
                <Navbar></Navbar>
                <h1 className="HUMP"><span className="RecluseWord">Recluse</span><span className="LetLooseWord"> Let Loose</span></h1>
                <Footer></Footer>
            </div>
        );
    }
}