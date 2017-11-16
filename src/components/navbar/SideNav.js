import React, { Component } from 'react';
import './SideNav.css'
import {connect} from 'react-redux';
import { getUser } from '../../ducks/reducer'
import logo from '../../assets/due_logo.svg'
import profilePic from '../../assets/profile.svg'

class SideNav extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getUser()
    }

    render() {
        console.log('this.props is: ', this.props)
        return (
            <div className='side'>
                <img className='profile_pic' src={this.props.user.user_pic} alt={profilePic}/>
                <div className='profile_name'>{this.props.user.user_name}</div>

                <div className='class'>
                <p>Add Class</p> <p className='add'>+</p>
                </div>

                <img className='nav_logo' src={logo} alt='#'/>
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