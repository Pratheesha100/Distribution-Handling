import React from "react";
import './op_port_header.css';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from "../redux/user/userSilce";
import woman from "../img/woman.png";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return(
    <header className="header">
        <div className="header-left">
            <h1 className="logo">NELCO</h1>
        </div>
        <div className="header-right">
            <nav className="nav-links top-nav-links">
            <span>News Feed</span>
            <span>Quick Actions</span>
            </nav>
            <div className="header-icons">
            <i className="bell-icon"></i>
            <img 
                src={woman} 
                alt="User Avatar" 
                className="user-avatar" 
            />
            </div>
        </div>
    </header>
);
}
