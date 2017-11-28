import React, { Component } from 'react';
import './Profile.css'
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import SideNav from '../navbar/SideNav.js';
import axios from 'axios';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classData: []
        }

    }

    //gets the user even on refresh
    componentWillMount() {
        this.props.getUser().then(res => {
            console.log('profile get user response', res)
        })
    }

    //gets all classes (calendars) for user, including calendar_name, class_name, classId
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        axios.get(`/api/classes/getbyclassname/${newProps.user.user_id}`).then(response => {
            this.setState({
                classData: response.data
            })
            console.log(this.state.classData)
        })
    }

    render() {
        return (
            <div className='profile'>
                <SideNav />
                <div className='profile-content'>
                <span>hello world</span>
                    {this.state.classData.length !== 0 ?
                        this.state.classData.map((clss, index) => {
                            return (
                                //returns a button for every class with access to the name, subject, and id
                                <div className='edit-class' key={clss.class_id}>
                                    <span>{clss.class_name}</span>
                                    <span className='delete'>x</span>
                                </div>
                            )
                        })
                        : null}
                </div>
                {/* <h1>{this.props.user.user_name}</h1> */}
            </div>
        )
    }
}

//used redux to make the user object acessible.
function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, { getUser })(Profile);