import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../pokeball.svg';
import '../App.scss'
import '../animations.scss';

export default function Header() {
    return (
        <Link to={{
            pathname: "/",
        }}>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
        </Link>
    )
}
