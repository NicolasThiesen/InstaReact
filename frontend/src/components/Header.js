import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from "../assets/logo.png";

export default function Header(){
    return(
        <header id="main-header">
            <div className="header-content">
                <Link to="/">
                    <button><i className="fab fa-instagram" alt="Home"/></button>                
                </Link>
                <Link to="/">
                    <img src={ logo } className="logo" alt="Instagram"/>
                </Link>
                <Link to="/new">
                    <button><i className="fas fa-camera" alt="Enviar Publicacao"/></button>
                </Link>
            </div>
        </header>
    );
}
