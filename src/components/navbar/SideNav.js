import React, { Component } from 'react';
import './SideNav.css'
import {connect} from 'react-redux';
import { getUser } from '../../ducks/reducer'
import logo from '../../assets/due_logo.svg'
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class SideNav extends Component {

    render() {
        console.log('this.props is: ', this.props)
        return (
            <div className='side'>
                <img className='profile_pic' src={this.props.user.user_pic} alt=''/>
                <div className='profile_name'>{this.props.user.user_name}</div>

                <div className='class'>
                <p>Add Class</p> <p className='add'>+</p>
                </div>
                <Button.Group>
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </Button.Group>

                <img className='nav_logo' src={logo} alt='#'/>
                <a className="login" href={process.env.REACT_APP_LOGOUT}><button>Logout</button></a>
            </div>
        )
    }
}

function mapStatetoProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStatetoProps, {getUser})(SideNav)