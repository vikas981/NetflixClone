import React, { useEffect, useState } from 'react'
import '../Nav.css';

function Nav (){
    const [show,handleShow] =useState(false);
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 100){
                handleShow(true);
            }else handleShow(false);
        });
        return()=>{
            window.removeEventListener("scroll");
        };

    },[]);
    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img 
                className="nav_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo"
            />
              <img 
                className="nav_avatar"
                src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                alt="Netflix Logo"
            />
        </div>
    )

}
export default Nav