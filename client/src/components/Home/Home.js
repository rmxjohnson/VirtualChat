import React from 'react';
import './Home.css';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Jumbotron1 from '../AboutUs/Aboutus';
import BigLogo1 from '../BigLogo/BigLogo';
import BubbleFun1 from '../BubbleFun/BubbleFun';


export default class Home extends React.Component {


    render() {
        return (
            <div className='HomeBackGround'>
                <Navbar/>
               <Jumbotron1 /> 
               <BigLogo1/>
              <BubbleFun1/>
                <Footer/>
            
            </div>
        );
    }
}