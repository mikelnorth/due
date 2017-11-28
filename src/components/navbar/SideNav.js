import React, { Component } from 'react';
import './SideNav.css'
import { connect } from 'react-redux';
import { setCalId } from '../../ducks/reducer'
import logo from '../../assets/due_logo.svg'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import MobileNav from '../navbar/MobileNav.js';
import ClassModal from '../class-modal/ClassModal.js'
import {Link} from 'react-router-dom'


class SideNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //an array of each class for a specefied user.
            classData: []
        }

        this.setCalId = this.setCalId.bind(this);
    }

  
// used componentwillreceive because did mount fired bfore the usesr_id was set to
// redux. Use componentwillreceive to get the user_id and then make an axios call to get
// all the classes associated to that user.
    componentWillReceiveProps(newProps) {
        axios.get(`/api/classes/getbyclassname/${newProps.user.user_id}`).then(response => {
            this.setState({
                classData: response.data
            })
        })
    }

    //sets the id of selected class to redux so it can be accessed in the class
    //component.
    setCalId(calId){
        console.log('class id ', calId)
        this.props.setCalId(calId)
    }

    render() {
        return (
            <div className='side'>
                <div className='side-top'>
                    <img className='profile_pic' src={this.props.user.user_pic} alt='' />
                    <div className='profile_name'>{this.props.user.user_name}</div>
                </div>
                {/* Checks to see if classes exist on state.
                if true maps over each class to create a button that links to each individual class */}
                <div className='side-container'>
                    <Link to='dashboard' className='class-btn'>
                         <div>
                            <p>Dashboard</p>
                         </div>
                    </Link>
                    {this.state.classData.length !== 0 ?
                        this.state.classData.map((clss, index) => {
                            console.log('classes from side nav: ',clss)
                            return (
                                //returns a button for every class with access to the name, subject, and id
                                <Link to='class' className='class-btn' onClick={() => this.setCalId(clss.calendar_id)}><div>
                                    <p>{clss.class_name}</p>
                                </div></Link>
                            )
                        })
                        : null}

                    {/* Modal from semantic-ui, used to hold the join/create class component
                    for desktop view. */}
                    <Modal trigger={<Button className='class-btn'>Add Class</Button>}>
                        <Modal.Header>Join or Create a Class</Modal.Header>
                        <Modal.Content image style={{padding: '0px'}}>
                                <ClassModal />            
                        </Modal.Content>
                    </Modal>
                    
                    </div>
                    <div className='side-bottom'>
                        <img className='nav_logo' src={logo} alt='#' />
                        <a className="login" href={process.env.REACT_APP_LOGOUT}><button>Logout</button></a>
                    </div>
                
            </div>
        )
    }
}

//used redux to make the user object acessible.
function mapStateToProps(state) {
    return {
      user: state.user,
      calId: state.calId
    }
  }
  export default connect(mapStateToProps, { setCalId })(SideNav);