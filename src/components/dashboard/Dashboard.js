import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import ReactModal from "react-modal";
import { getUser } from '../../ducks/reducer'
import Select from "react-select";
import "../../../node_modules/react-select/dist/react-select.css";

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                school: ''
            },
            showModal: false,
            hideModal: false
        }

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);

    }

    componentWillMount() {
        this.props.getUser()

        // this.props.user.school? this.handleCloseModal() : this.handleOpenModal()
        console.log("user: ", this.props.user)
        console.log("school: ", this.props.user.school)
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        newProps.user.school_id ? this.handleCloseModal() : this.handleOpenModal()
        
    }
    handleOpenModal(){
        this.setState({
            showModal:true,
            hideModal: !this.state.hideModal

        })
    }

    handleCloseModal(){
        this.setState({
            showModal:false,
            hideModal: !this.state.hideModal

        })
    }

    handlChange(val){
        this.setState({
            user: {
                school: val
            }
        })
        console.log(this.state.user.school)
    }

    submit(){
        this.state.user.school? this.handleCloseModal() : this.handleOpenModal()
    }

    render() {
        console.log(this.props)
        return (
            <div className='dashboard'>
                <p>welcome to the dashboard</p>
                <a href={process.env.REACT_APP_LOGOUT}><button>Logout</button></a>
                <div>
                {/* <button onClick={ this.handleOpenModal }>Open</button> */}
                    <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="onRequestClose Example"
                        onRequestClose={this.handleCloseModal}
                        className='Modal'
                        overlayClassName='Overlay'>
                        <h4>What School do you attend?</h4>
                        <input onChange={(e) => this.handlChange( e.target.value)}></input>
                        <button onClick={() => this.submit()}>Submit</button>
                    </ReactModal>
                </div>
            </div >
        )
    }
}

function mapStatetoProps(state){
    return {
        user: state.user,
        email: state.email
    }
}

export default (connect(mapStatetoProps,{ getUser })(Dashboard))