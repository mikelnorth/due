import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {

      render() {
        return (
          <div className="Landing">
            <h1>Landing</h1>
            <a href={ process.env.REACT_APP_LOGIN }><button>Login</button></a>
          </div>
        );
      }
    }
    
    export default Landing