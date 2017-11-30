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
import { elastic as Menu } from 'react-burger-menu'
import "./Class.css"
import { Doughnut } from "react-chartjs-2"



class Class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            events: [],
            topFive: [],
            hidden: false,
        }

        this.getClassInfo = this.getClassInfo.bind(this)
        this.eventStyleGetter = this.eventStyleGetter.bind(this);

    }

    componentDidMount() {
        this.props.getUser()
        //console.log(this.props)

        this.getClassInfo(this.props.user.user_id, this.props.calId)
    }


    componentWillReceiveProps(newProps) {
        //console.log(newProps)
        this.getClassInfo(newProps.user.user_id, newProps.calId)
    }

    //reusable method that gets all classes for a specified user by userId and calId.
    getClassInfo(userId, calId) {
        //gets the classes for the calendar
        axios.get(`/api/assignments/get/class/${userId}/${calId}`).then(
            response => {
                response.data.map((event, index) => {
                    event.start = new Date(event.start)
                    event.end = new Date(event.end)

                })
                this.setState({
                    events: response.data
                })
            })
        //gets the next 5 assignments.
        axios.get(`/api/assignments/get/topfiveclass/${userId}/${calId}`).then(response => {
            response.data.map((assignment, index) => {
                axios.get(`/api/assignment/get/countincomplete/${assignment.assignment_id}`).then(comp => {
                    assignment.incomplete = parseInt(comp.data[0].incomplete, 10)
                    axios.get(`/api/assignment/get/countcomplete/${assignment.assignment_id}`).then(incom => {
                        assignment.complete = parseInt(incom.data[0].complete, 10)
                        console.log(response.data)
                        this.setState({ topFive: response.data })
                    })
                })
            })


        })
    }

    eventStyleGetter(event, start, end, isSelected, desc) {

        let style = {

            backgroundColor: `#${event.color}`,
            color: 'white'
        };
        return {
            style: style

        }
    }

    showSettings(event) {
        event.preventDefault();

    }



    render() {

        function formatDate(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
        }

        var styles = {
            bmBurgerButton: {
                position: 'fixed',
                width: '36px',
                height: '30px',
                right: '36px',
                top: '36px'
            },
            bmBurgerBars: {
                background: '#373a47'
            },
            bmCrossButton: {
                height: '24px',
                width: '24px'
            },
            bmCross: {
                background: '#bdc3c7'
            },
            bmMenu: {
                background: '#373a47',
                padding: '2.5em 1.5em 0',
                fontSize: '1.15em'
            },
            bmMorphShape: {
                fill: '#373a47'
            },
            bmItemList: {
                color: '#b8b7ad',
                padding: '0.8em'
            },
            bmOverlay: {
                background: 'rgba(0, 0, 0, 0.3)'
            }
        }

        return (
            <div className='class'>
                <MediaQuery query="(min-width: 1024.1px)">
                    <SideNav />
                    <div className='dashboardContainer'>

                        <Menu styles={styles} right>
                            <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'scroll' }}>


                            </div>
                        </Menu>




                        {this.state.topFive.length !== 0 ?
                            <div className="upcomingContainer">
                                {

                                    this.state.topFive.map((assignment, index) => {
                                        let data2 = {
                                            labels: ['Complete', 'Not Yet Completed'],
                                            datasets: [{
                                                data: [assignment.complete, assignment.incomplete],
                                                backgroundColor: [
                                                    '#1485CB',
                                                    'gray'
                                                ]
                                            }]
                                        }

                                        let option = {
                                            legend: {
                                                display: false,
                                                labels: {
                                                    display: false
                                                }
                                            }
                                        }
                                        return (
                                            <div className="upcomingAssignment">
                                                <div className="assignmentContainer">
                                                    <div className="assignmentDisplay">
                                                        <span className="title">{assignment.title}</span>
                                                        <span className="class">Class: {assignment.desc}</span>
                                                        <span className="dueDate">{formatDate(new Date(assignment.start))}</span>
                                                        <span className="pointsPoss">Points possible: {assignment.points_possible}</span>
                                                        {/* <input type="checkbox" value={assignment.complete}/> */}
                                                        <Doughnut height={50} width={100} data={data2} options={option}></Doughnut>

                                                    </div>
                                                </div>
                                                {index < this.state.topFive.length - 1 ? <div className="separator"></div> : null}
                                            </div>
                                        )


                                    })
                                }
                            </div>


                            :
                            <div className="upcomingContainer">
                                No Upcoming Assignments

                            </div>

                        }


                        <div className="calendarWrapper">
                            <BigCalendar
                                events={this.state.events}
                                //   views={{month: true, week: true}}
                                // views={allViews}
                                step={60}
                                defaultDate={new Date()}
                                eventPropGetter={(this.eventStyleGetter)}

                            />
                        </div>
                    </div>

                </MediaQuery>
                <MediaQuery query="(max-width: 1024px)">
                    <MobileNav />
                    <div className="calendarWrapper">
                        <BigCalendar
                            events={this.state.events}
                            views={{ month: true, week: true }}
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
        calId: state.calId,
    }

}

export default (connect(mapStatetoProps, { getUser })(Class))