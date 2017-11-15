import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {

      render() {
        return (
          <div className="Landing">
            <h1>Landing</h1>
            <Link to='/dashboard' ><button>Login</button></Link>
          </div>
        );
      }
    }
    
    export default Landing