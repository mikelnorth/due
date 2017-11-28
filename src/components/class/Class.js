import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer'
import SideNav from '../navbar/SideNav.js';
import MobileNav from '../navbar/MobileNav.js';
import axios from 'axios';
import MediaQuery from 'react-responsive';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'



class Class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            events: []
        }
    }

    componentDidMount(){
        this.props.getUser()
        console.log(this.props)
        console.log(this.props.user.user_id)
        
        axios.get(`/api/assignments/get/class/${this.props.user.user_id}/${this.props.classId}`).then(
            response =>{
                console.log('get class response', response)
                response.data.map((event, index) => {
                    event.start = new Date(event.start)
                    event.end = new Date(event.end)
                    
                })
                this.setState({
                    events: response.data
                })
                console.log(this.state.events)
            })
    }

    componentWillReceiveProps(newProps){
        console.log(newProps.classId)

        axios.get(`/api/assignments/get/class/${newProps.user.user_id}/${newProps.classId}`).then(
            response =>{
                console.log('get class response', response)
                response.data.map((event, index) => {
                    event.start = new Date(event.start)
                    event.end = new Date(event.end)
                    
                })
                this.setState({
                    events: response.data
                })
                console.log(this.state.events)
            })
    }

    render() {
   
        return (
            <div className='class'>
                <MediaQuery query="(min-width: 1024.1px)">
                    <SideNav />
                    <div className='dashboardContainer'>
                        <div className="calendarWrapper">
                            <BigCalendar
                                events={this.state.events}
                                //   views={{month: true, week: true}}
                                // views={allViews}
                                step={60}
                                defaultDate={new Date()}
                            />
                        </div>
                    </div>
    
                </MediaQuery>
                <MediaQuery query="(max-width: 1024px)">
                    <MobileNav />
                    <div className="calendarWrapper">
                            <BigCalendar
                                events={this.state.events}
                                  views={{month: true, week: true}}
                                // views={allViews}
                                step={60}
                                defaultDate={new Date()}
                            />
                        </div>
                </MediaQuery>
            </div>
        )
    }
}




function mapStatetoProps(state) {
    return {
        user: state.user,
        classId: state.classId,
    }

}

export default (connect(mapStatetoProps, {getUser})(Class))