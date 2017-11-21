import React, { Component } from 'react';
import './SideNav.css'
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer'
import logo from '../../assets/due_logo.svg'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import MobileNav from '../navbar/MobileNav.js';


class SideNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //an array of each class for a specefied user.
            classNames: []
        }
    }

  
// used componentwillreceive because did mount fired bfore the usesr_id was set to
// redux. Use componentwillreceive to get the user_id and then make an axios call to get
// all the classes associated to that user.
    componentWillReceiveProps(newProps) {
        console.log('componentwillrecieveprops side',newProps.user.user_id)
        
        axios.get(`/api/classes/getbyclassname/${newProps.user.user_id}`).then(response => {
            console.log('response',response)
            this.setState({
                classNames: response.data
            })
        })
    }

    render() {
        console.log('this.state sideNave: ', this.state)
        return (
            <div className='side'>
                <div className='side-top'>
                    <img className='profile_pic' src={this.props.user.user_pic} alt='' />
                    <div className='profile_name'>{this.props.user.user_name}</div>
                </div>
                {/* Checks to see if classes exist on state.
                if true maps over each class to create a button that links to each individual class */}
                <div className='side-container'>
                    {this.state.classNames.length !== 0 ?
                        this.state.classNames.map((clss, index) => {
                            return (
                                <div className='class-btn'>
                                    <p>{clss.class_name}</p>
                                </div>
                            )
                        })
                        : null}

                    {/* Modal from semantic-ui, used to hold the join/create class component
                    for desktop view. */}
                    <Modal trigger={<Button className='class-btn' >Add Class</Button>}>
                        <Modal.Header>Join or Create a Class</Modal.Header>
                        <Modal.Content image>
                        
                            <Modal.Description>
                                <Header></Header>
                                this is where the wizard goes...
                                {/* <classModal /> */}
                            </Modal.Description>
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
      user: state.user
    }
  }
  export default connect(mapStateToProps, { getUser })(SideNav);