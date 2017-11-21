import React, { Component } from 'react';
import './SideNav.css'
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer'
import logo from '../../assets/due_logo.svg'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';

class SideNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classNames: []
        }
    }

    componentDidMount() {
        console.log('sideNav didMount')
        console.log('user id', this.props.user.user_id)
        axios.get(`/api/classes/getbyclassname/${this.props.user.user_id}`).then(response => {
            console.log('response',response)
            this.setState({
                classNames: response.data
            })
        })
        // .catch((err) => response.status(500).send(err) )
    }

    render() {
        console.log('this.state sideNave: ', this.state)
        return (
            <div className='side'>
                <div className='side-top'>
                    <img className='profile_pic' src={this.props.user.user_pic} alt='' />
                    <div className='profile_name'>{this.props.user.user_name}</div>
                </div>
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
                    <Modal trigger={<Button className='class-btn' >Add Class</Button>}>
                        <Modal.Header>Select a Photo</Modal.Header>
                        <Modal.Content image>
                            <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
                            <Modal.Description>
                                <Header>Default Profile Image</Header>
                                <p>We've found the following gravatar image associated with your e-mail address.</p>
                                <p>Is it okay to use this photo?</p>
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

function mapStateToProps(state) {
    return {
      user: state.user
    }
  }
  export default connect(mapStateToProps, { getUser })(SideNav);