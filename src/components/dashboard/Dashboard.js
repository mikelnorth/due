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
 import 'react-big-calendar/lib/css/react-big-calendar.css'
 
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
            events: []
        }
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
        this.props.getUser().then(res =>{
            axios.get(`/api/assignments/getall/${res.value.user_id}`).then(
                response =>{
                    console.log('HERE IT IS', response)
                    response.data.map((event, index) => {
                        event.start = new Date(event.start)
                        event.end = new Date(event.end)
                        
                    })
                    this.setState({
                        events: response.data
                    })
                    console.log(this.state.events)
                }
            )
        })
        
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        newProps.user.school_id ? this.handleCloseModal() : this.handleOpenModal()
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


    render() {
        console.log('this.props', this.props)

        const getOptions = (input) => {
            return fetch(`/users/${input}.json`)
                .then((response) => {
                    return response.json();
                }).then((json) => {
                    return { options: json };
                });
        }

        // const eventStuff = this.state.events



        var options = [
            { value: 1111, label: 'University of Utah' },
            { value: 2222, label: 'Utah Valley University' },
            { value: 3333, label: 'Brigham Young University' },
            { value: 4444, label: 'Southern Utah University' },
            { value: 5555, label: 'Snow College' },
            { value: 6666, label: 'Dixie State' },
        ];

        let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]) 
        return (
            <div className='dashboard'>
                <MediaQuery query="(min-width: 1024.1px)">
                    <SideNav />
                    <div className='dashboardContainer'>
                         <div className="calendarWrapper">
                            <BigCalendar
                                 events={this.state.events}
                                //   views={{month: true, week: true}}
                                views={allViews}
                                 step={60}
                                 defaultDate={new Date()}
                             />
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
                                value="one"
                                loadOptions={getOptions}
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
    return {
        user: state.user,
        email: state.email
    }
}

export default (connect(mapStatetoProps, { getUser })(Dashboard))