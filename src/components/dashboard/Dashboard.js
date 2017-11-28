import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import ReactModal from "react-modal";
import { getUser } from '../../ducks/reducer'
import Select from "react-select";
import "../../../node_modules/react-select/dist/react-select.css";
import axios from 'axios';
import MediaQuery from 'react-responsive';
import SideNav from '../navbar/SideNav.js';
import MobileNav from '../navbar/MobileNav.js';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import ReactColor from '../../components/react-color/ReactColor';

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
            events: [],
            topFive: []
        }
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    componentWillMount() {
        this.getAll(this.props.user.user_id)

    }
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        newProps.user.school_id ? this.handleCloseModal() : this.handleOpenModal()
    }

    getAll(userId){
            axios.get(`/api/assignments/getall/${userId}`).then(
                response => {
                    response.data.map((event, index) => {
                        event.start = new Date(event.start)
                        event.end = new Date(event.end)

                    })
                    this.setState({
                        events: response.data
                    })
                    console.log(this.state.events)
                
            axios.get(`/api/assignments/get/topfive/${userId}`).then(response => {
                this.setState({ topFive: response.data })
            })
        })
    }

    handleOpenModal() {
        this.setState({
            showModal: true,
            // hideModal: !this.state.hideModal
        })
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
            // hideModal: !this.state.hideModal

        })
    }

    handleSelect(val) {
        this.setState({
            select: val,
        })
        console.log("select state", this.state.select.value)
        console.log("select state", this.state.select.label)
    }

    submit() {
        axios.post(`/api/schools/insert/${this.state.select.value}/${this.props.user.user_id}/${this.state.select.label}`)
        this.state.select ? this.handleCloseModal() : this.handleOpenModal()

        this.setState({
            showNav: true
        })
    }

    eventStyleGetter(event, start, end, isSelected, desc) {
        console.log(event)



        if(event.desc === "Testing React Color"){
            let style = {
                backgroundColor: '#222222',
                color: 'white'
            };
            return {
                style: style
            }
        }
        let style = {
            backgroundColor: '',
            color: 'white'
        };
        return {
            style: style
        }
    }


    render() {
        console.log('this.props', this.props)
        console.log(this.state.topFive)
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
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
          }
       
        return (
            <div className='dashboard'>
                <MediaQuery query="(min-width: 1024.1px)">
                    <SideNav />
                    <div className='dashboardContainer'>
                        {this.state.topFive.length !== 0 ?
                            <div className="upcomingContainer">
                                {
                                    this.state.topFive.map((assignment, index) => {

                                        return (
                                            <div className="upcomingAssignment">
                                                <div className="assignmentContainer">
                                                    <div className="assignmentDisplay">
                                                        <span className="title">{assignment.title}</span>
                                                        <span className="class">Class: {assignment.desc}</span>
                                                        <span className="dueDate">{formatDate(new Date(assignment.start))}</span>
                                                        <span className="pointsPoss">Points possible: {assignment.points_possible}</span>
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
                                <div className="upcomingAssignment">
                                    <div>

                                    </div>
                                </div>
                                <div className="separator"></div>
                                <div className="upcomingAssignment">
                                    <div>

                                    </div>
                                </div>
                                <div className="separator"></div>
                                <div className="upcomingAssignment">
                                    <div>

                                    </div>
                                </div>
                                <div className="separator"></div>
                                <div className="upcomingAssignment">
                                    <div>

                                    </div>
                                </div>
                                <div className="separator"></div>
                                <div className="upcomingAssignment">
                                    <div>

                                    </div>
                                </div>
                            </div>

                        }
                        <div className="calendarWrapper">
                            {this.props.user.school_id ? <BigCalendar
                                events={this.state.events}
                                //   views={{month: true, week: true}}
                                views={allViews}
                                step={60}
                                defaultDate={new Date()}
                                eventPropGetter={(this.eventStyleGetter)}
                            /> :

                                <BigCalendar
                                    events={this.state.events}
                                    //   views={{month: true, week: true}}
                                    views={allViews}
                                    step={60}
                                    defaultDate={new Date()}
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
                    {this.state.showNav || this.props.user.school_id ? <MobileNav /> : null}

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
                            <h4>What School do you attend?</h4>

                            <Select
                                className='school-select'
                                name="form-field-name"
                                placeholder="Select A School"
                                value={this.state.select}
                                options={options}
                                onChange={this.handleSelect}
                            />
                            <Select.Async
                                className='fetch'
                                name="form-field-name"
                                value={this.state.select}
                                loadOptions={getOptions}
                                isLoading={isLoadingExternally}
                                onChange={this.handleSelect}

                            />
                            <button onClick={() => this.submit()}>Submit</button>
                        </div>
                    </ReactModal>
                </div>
            </div >
        )
    }
}

function mapStatetoProps(state) {
    console.log(state)
    return {
        user: state.user,
        email: state.email,
        school_id: state.user.school_id
    }
}

export default (connect(mapStatetoProps, { getUser })(Dashboard))