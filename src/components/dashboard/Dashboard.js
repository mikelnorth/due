import React, { Component } from 'react';
import './Dashboard.css';


export default class Dashboard extends Component {
    render() {
        return (
            <div className='dashboard'>
                <p>welcome to the dashboard</p>
                <a href={process.env.REACT_APP_LOGOUT}><button>Logout</button></a>
            </div >
        )
    }
}