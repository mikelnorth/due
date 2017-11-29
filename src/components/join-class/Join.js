import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from "axios";
import './Join.css';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';


class Join extends Component {
    constructor(props) {
        super(props)

        this.state = {
            classes: [],
            cal_id: null,
            color: ''
        }
        this.selectCal = this.selectCal.bind(this)
        this.submitCalendar = this.submitCalendar.bind(this)
    }

    componentDidMount() {
        console.log(this.props.classForJoin)
        axios.get(`/api/calendars/get/${this.props.classForJoin.value}`).then(response => {
            console.log("classes: " , response.data)
            this.setState({ classes: response.data })
        })
    }

    selectCal(calendar_id, color){
        this.setState({
            cal_id: calendar_id,
            color: color
        })
        console.log(this.state.cal_id)
    }

    submitCalendar(){
        axios.post(`/api/usercalendar/add/${this.props.user.user_id}/${this.state.cal_id}/${this.state.color}`).then( response => {
            console.log(response)
            console.log(this.props)
            axios.post(`/api/assignments/add/user/assignments/${this.props.user.user_id}/${this.props.classForJoin.value}/${this.state.cal_id}`).then(response => {
                console.log("Added to User Assignment: ", response)
            window.location.reload(true)
            })
        })
    }

    render() {
        console.log(this.state.classes)
        return (
            <div className="classes-container">
                <span>Select your teacher</span>
                <div className="join-class-column"> 
                    {/* <span>Teacher</span><span>Days of Week</span> */}
                </div>
                {this.state.classes.map((clss, index) => {
                    return (
                        <button className='classes' onClick={() => this.selectCal(clss.calendar_id, clss.color)}>
                            <div className="teacher-and-days">
                                <span>{clss.calendar_name}</span>
                                <span>{clss.days}</span>
                            </div>
                        </button>
                    )
                })}
                <Link to="/dashboard" className="submit-btn"><button  onClick={this.submitCalendar}>Submit</button></Link>  
            </div>
        )
    }
}


function mapStatetoProps(state) {
    return {
        user: state.user,
        email: state.email
    }
}

export default (connect(mapStatetoProps)(Join))