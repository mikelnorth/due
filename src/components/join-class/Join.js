import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from "axios"
import './Join.css'

class Join extends Component {
    constructor(props) {
        super(props)

        this.state = {
            classes: [],
            cal_id: null
        }
        this.selectCal = this.selectCal.bind(this)
        this.submitCalendar = this.submitCalendar.bind(this)
    }

    componentDidMount() {
        axios.get(`api/calendars/get/2`).then(response => {
            this.setState({ classes: response.data })
        })
    }

    selectCal(calendar_id){
        this.setState({
            cal_id: calendar_id
        })
        console.log(this.state.cal_id)
    }

    submitCalendar(){
        axios.post(`/api/usercalendar/add/6/${this.state.cal_id}`).then( response => {
            console.log(response)
        })
    }

    render() {
        console.log(this.state.classes)
        return (
            <div>
                {this.state.classes.map((clss, index) => {
                    return (
                        <button className='classes' onClick={() => this.selectCal(clss.calendar_id)}>
                            {clss.calendar_name}
                            {clss.days}
                        </button>
                    )
                })}
                <button onClick={this.submitCalendar}>Submit</button>
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