import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import ReactModal from "react-modal";
import { getUser, setEvents, setTopFive } from '../../ducks/reducer'
import Select from "react-select";
import "../../../node_modules/react-select/dist/react-select.css";
import axios from 'axios';
import MediaQuery from 'react-responsive';
import SideNav from '../navbar/SideNav.js';
import MobileNav from '../navbar/MobileNav.js';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Doughnut } from 'react-chartjs-2'
import { elastic as Menu } from 'react-burger-menu'
import logo from '../../assets/due-logo.png'


import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);


class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            showModal: false,
            // hideModal: false,
            select: '',
            showNav: false,

            essays: [],
            quizzes: [],
            tests: [],
            hw: [],
            open: false,
            selectedEvent: [],
        }
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.eventStyleGetter = this.eventStyleGetter.bind(this);
        this.completeAssignment = this.completeAssignment.bind(this)
    }

    componentDidMount() {
        // var tests = this.props.
    }

    componentWillReceiveProps(newProps) {
        newProps.user.school_id ? this.handleCloseModal() : this.handleOpenModal()
        //console.log(newProps)
        console.log("Assignments: ", newProps.all.events)

        let essays = newProps.all.events.filter((event) => event.category === 1)
        let tests = newProps.all.events.filter((event) => event.category === 2)
        let quizzes = newProps.all.events.filter((event) => event.category === 3)
        let hw = newProps.all.events.filter((event) => event.category === 4)

        // console.log("essays: ", essays)
        // console.log("tests: ", tests)
        // console.log("quizzes: ", quizzes)
        // console.log("hw: ", hw)

        this.setState({
            essays,
            tests,
            quizzes,
            hw
        })

    }

    handleOpenModal() {
        this.setState({
            showModal: true,
        })
    }

    handleCloseModal() {
        this.setState({
            showModal: false,

        })
    }

    handleSelect(val) {
        this.setState({
            select: val,
        })
    }

    submit() {
        axios.post(`/api/schools/insert/${this.state.select.value}/${this.props.user.user_id}/${this.state.select.label}`)
        this.state.select ? this.handleCloseModal() : this.handleOpenModal()

        this.setState({
            showNav: true
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

    completeAssignment(userId, assignmentId) {

        axios.put(`/api/assignments/complete/${userId}/${assignmentId}`).then(res => {

            axios.get(`/api/assignments/getall/${userId}`).then(events => {
                events.data.map((event, index) => {
                    event.start = new Date(event.start)
                    event.end = new Date(event.end)

                })
                this.props.setEvents(events.data)
                axios.get(`/api/assignments/get/topfive/${userId}`).then(response => {
                    // this.setState({ topFive: response.data })
                    response.data.map((assignment, index) => {
                        axios.get(`/api/assignment/get/countincomplete/${assignment.assignment_id}`).then(comp => {
                            assignment.incomplete = parseInt(comp.data[0].incomplete, 10)
                            axios.get(`/api/assignment/get/countcomplete/${assignment.assignment_id}`).then(incom => {
                                assignment.complete = parseInt(incom.data[0].complete, 10)
                                this.props.setTopFive(response.data)
                            })
                        })
                    })
                })
            })

        })

    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    dialogCompleteAssignment = () => {
        console.log('User Id: ', this.props.user.user_id)
        console.log('Assignment Id: ', this.state.selectedEvent)
        this.completeAssignment(this.props.user.user_id, this.state.selectedEvent.assignment_id)
        let temp = this.state.selectedEvent;
        temp.completed = !temp.completed;
        this.setState({ selectedEvent: temp })
    }

    daysLeft = (date) => {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(date);
        var secondDate = Date.now();

        return Math.round(((firstDate.getTime() - secondDate) / (oneDay)))
    }

    render() {
        const actions = [
            this.state.selectedEvent.completed ?
                <FlatButton
                    label="Assignment Complete"
                    style={{ backgroundColor: '#EEFFEA', color: 'black', marginRight: '15px' }}
                    primary={true}
                    onClick={this.dialogCompleteAssignment}
                />
                :
                <FlatButton
                    label="Assignment Incomplete"
                    style={{ backgroundColor: '#FFF0EC', color: 'black', marginRight: '15px' }}
                    primary={true}
                    onClick={this.dialogCompleteAssignment}
                />
            ,
            <FlatButton
                label="Close"
                primary={true}
                style={{ color: "#1485CB" }}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];
        const getOptions = (input) => {
            return fetch(`https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=${input}&_fields=school.name,id&api_key=YBXKnMOHVby0cMoDcpxpLSyv7dtBFZVawfqIVJ3s`)
                .then((response) => {
                    return response.json();
                }).then((json) => {
                    let schools = [];
                    json.results.map((schoolmap, index) => {
                        let temp = { value: '', label: '' }

                        // temp.value = schoolmap.school.name;
                        temp.label = schoolmap['school.name']
                        temp.value = schoolmap.id
                        schools.push(temp)
                    })
                    return { options: schools }
                });
        }

        let isLoadingExternally = true;

        var options = [
            { value: 1111, label: 'University of Utah' },
            { value: 2222, label: 'Utah Valley University' },
            { value: 3333, label: 'Brigham Young University' },
            { value: 4444, label: 'Southern Utah University' },
            { value: 5555, label: 'Snow College' },
            { value: 6666, label: 'Dixie State' },
        ];

        let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

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
                fontSize: '1.15em',
            },
            bmMorphShape: {
                fill: '#373a47',
            },
            bmItemList: {
                color: '#b8b7ad',
                padding: '0.8em'
            },
            bmOverlay: {
                background: 'rgba(0, 0, 0, 0.5)'
            }
        }

        return (
            <div className='dashboard'>
                <Menu styles={styles} right>
                    <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'scroll', textAlign: 'left' }}>
                        Essays<br />-----<br />
                        {this.state.essays.map((assignment, index) => {
                            //console.log(assignment)
                            return (
                                <div> {
                                    assignment.completed ? <span style={{ color: 'limegreen', cursor: 'pointer' }} onClick={() => this.completeAssignment(this.props.user.user_id, assignment.assignment_id)}>{assignment.title}</span> :
                                        <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => this.completeAssignment(this.props.user.user_id, assignment.assignment_id)}>{assignment.title}</span>
                                }
                                </div>
                            )

                        })}
                        <br />Quizzes<br />-----<br />
                        {this.state.quizzes.map((assignment, index) => {
                            //console.log(assignment)
                            return (
                                <div> {
                                    assignment.completed ? <span style={{ color: 'limegreen', cursor: 'pointer' }} onClick={() => this.completeAssignment(this.props.user.user_id, assignment.assignment_id)}>{assignment.title}</span> :
                                        <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => this.completeAssignment(this.props.user.user_id, assignment.assignment_id)}>{assignment.title}</span>
                                }
                                </div>
                            )

                        })}
                        <br />Tests<br />-----<br />
                        {this.state.tests.map((assignment, index) => {
                            //console.log(assignment)
                            return (
                                <div> {
                                    assignment.completed ? <span style={{ color: 'limegreen', cursor: 'pointer' }} onClick={() => this.completeAssignment(this.props.user.user_id, assignment.assignment_id)}>{assignment.title}</span> :
                                        <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => this.completeAssignment(this.props.user.user_id, assignment.assignment_id)}>{assignment.title}</span>
                                }
                                </div>
                            )

                        })}
                        <br />Homework<br />--------<br />
                        {this.state.hw.map((assignment, index) => {
                            //console.log(assignment)
                            return (
                                <div> {
                                    assignment.completed ? <span style={{ color: 'limegreen', cursor: 'pointer' }} onClick={() => this.completeAssignment(this.props.user.user_id, assignment.assignment_id)}>{assignment.title}</span> :
                                        <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => this.completeAssignment(this.props.user.user_id, assignment.assignment_id)}>{assignment.title}</span>
                                }
                                </div>
                            )

                        })}
                    </div>
                </Menu>
                <MediaQuery query="(min-width: 1024.1px)">
                    <SideNav />
                    <div className='dashboardContainer'>
                        {this.props.all.topFive.length !== 0 ?
                            <div className="upcomingContainer">
                                {
                                    this.props.all.topFive.map((assignment, index) => {
                                        let data2 = {
                                            labels: ['Complete', 'Not Complete'],
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
                                                        <Doughnut height={50} width={100} data={data2} options={option}></Doughnut>
                                                    </div>
                                                </div>
                                                {index < this.props.all.topFive.length - 1 ? <div className="separator"></div> : null}
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
                            {this.props.user.school_id ? <BigCalendar
                                events={this.props.all.events}
                                //   views={{month: true, week: true}}
                                views={allViews}
                                step={60}
                                defaultDate={new Date()}
                                eventPropGetter={(this.eventStyleGetter)}
                                onSelectEvent={event => this.setState({ selectedEvent: event, open: true })}
                            /> :

                                <BigCalendar
                                    events={this.props.all.events}
                                    //   views={{month: true, week: true}}
                                    views={allViews}
                                    step={60}
                                    defaultDate={new Date()}
                                    onSelectEvent={event => this.setState({ selectedEvent: event, open: true })}
                                />
                                // <div className="clickToAddMessage">
                                //     <span className="addMessage">
                                //         ⇦ Click over there to add your first a class!
                                //     </span>
                                // </div>

                            }
                        </div>
                    </div>

                </MediaQuery>
                <MediaQuery query="(max-width: 1024px)">
                    {this.state.modal ? null : <MobileNav />}

                    <div className='dashboardContainer'>

                        <div className="calendarWrapper">
                            {this.props.user.school_id ? <BigCalendar
                                events={this.props.all.events}
                                views={{ month: true, week: true }}
                                // views={allViews}
                                step={60}
                                defaultDate={new Date()}
                                eventPropGetter={(this.eventStyleGetter)}
                                onSelectEvent={event => alert(event.title)}
                            /> :

                                <BigCalendar
                                    events={this.props.all.events}
                                    views={{ month: true, week: true }}
                                    // views={allViews}
                                    step={60}
                                    defaultDate={new Date()}
                                    onSelectEvent={event => alert(event.title)}
                                />
                                // <div className="clickToAddMessage">code
                                //     <span className="addMessage">
                                //         ⇦ Click over there to add your first a class!
                                //     </span>
                                // </div>

                            }
                        </div>
                    </div>

                </MediaQuery>
                <div>
                    {/* <button onClick={ this.handleOpenModal }>Open</button> */}
                    <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="onRequestClose Example"
                        onRequestClose={this.handleCloseModal}
                        className='Modal'
                        overlayClassName='Overlay'>

                        {/* <input onChange={(e) => this.handlChange( e.target.value)}></input> */}

                        <div className='select'>
                            <h4>Welcom to due</h4>
                            <img className='modal-logo' src={logo}/>
                            <h2>What School do you attend?</h2>
                            <Select.Async
                                className='fetch'
                                name="form-field-name"
                                value={this.state.select}
                                loadOptions={getOptions}
                                isLoading={isLoadingExternally}
                                onChange={this.handleSelect}

                            />
                            <button className='dashboard-submit' onClick={() => this.submit()}>Submit</button>
                        </div>
                    </ReactModal>
                    <div>
                        <Dialog
                            title={`Assignment: ${this.state.selectedEvent.title}`}
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                            contentStyle={{
                                width: '30%',
                                maxWidth: 'none',
                            }}
                        >
                            <div>
                                Class: {this.state.selectedEvent.desc}<br/>
                                {this.daysLeft(this.state.selectedEvent.start) < 0 ? <span>Days past due: {Math.abs(this.daysLeft(this.state.selectedEvent.start))}</span> : <span>Days until due: {Math.abs(this.daysLeft(this.state.selectedEvent.start))}</span>}
                            </div>

                        </Dialog>
                    </div>
                </div>
            </div >
        )
    }
}

function mapStatetoProps(state) {
    return {
        user: state.user,
        email: state.email,
        school_id: state.user.school_id,
        all: state,
        classInfo: state.classInfo,
        update: state.update
    }
}

export default (connect(mapStatetoProps, { getUser, setEvents, setTopFive })(Dashboard))