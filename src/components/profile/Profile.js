import React, { Component } from 'react';
import './Profile.css'
import { connect } from 'react-redux';
import { getUser, deleteClass } from '../../ducks/reducer';
import SideNav from '../navbar/SideNav.js';
import axios from 'axios';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }


    //deletes a class associated to the user.
    deleteClass(classId) {
        this.props.deleteClass(this.props.user.user_id, classId)
    }

    addAssignments(classId) {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        console.log(this.props.classInfo)
        return (
            <div className='profile'>
                <SideNav />
                <div className='profile-content'>
                    <span>hello world</span>
                    {this.props.classInfo.length !== 0 ?
                        this.props.classInfo.map((clss, index) => {
                            return (
                                //returns a button for every class with access to the name, subject, and id
                                <div className='edit-class' key={clss.calendar_id}>
                                    <span>{clss.class_name}</span>
                                    <span className='delete' onClick={() => this.deleteClass(clss.calendar_id)}>x</span>
                                </div>
                            )
                        })
                        : null}

                    <span>Admin calendars</span>
                    {console.log(this.props.adminCalendars)}
                    {this.props.adminCalendars.length !== 0 ?
                        this.props.adminCalendars.map((clss, index) => {
                            return (
                                //returns a button for every class with access to the name, subject, and id
                                <div className='edit-class' key={clss.class_id}>
                                    <span>{clss.calendar_name}</span>
                                    <span className='Add' onClick={() => this.addAssignments(clss.class_id)}>+</span>
                                </div>
                            )
                        })
                        : null}



                </div>


                <Modal open={this.state.open}>
                    <span className='delete' onClick={() => this.addAssignments()}>X</span>
                    <Modal.Header>Join or Create a Class</Modal.Header>
                    <Modal.Content image style={{ padding: '0px' }}>
                        <p>adding class</p>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

//used redux to make the user object acessible.
function mapStateToProps(state) {
    return {
        user: state.user,
        classInfo: state.classInfo,
        adminCalendars: state.adminCalendars
    }
}
export default connect(mapStateToProps, { getUser, deleteClass })(Profile);