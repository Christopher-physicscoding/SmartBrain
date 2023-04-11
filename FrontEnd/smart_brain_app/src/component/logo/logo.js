import React from "react";
import brain from "./brain.png";
import Tilt from 'react-parallax-tilt';
import './logo.css';
import 'tachyons';
const Logo = () => {
    return(
        <div className="ma4 mt0 " >
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> 
                    <img style={{paddingTop :'5px'}}src={brain} alt="logo" width="100px"></img>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;