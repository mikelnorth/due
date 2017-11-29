import React, { Component } from 'react';
import './Profile.css'
import { connect } from 'react-redux';
import { getUser, deleteClass, setCalandClassId } from '../../ducks/reducer';
import SideNav from '../navbar/SideNav.js';
import axios from 'axios';
import AddAssignment from '../class-modal/AddAssignment.js';
import { withRouter } from 'react-router-dom'
import Select from "react-select";
import "../../../node_modules/react-select/dist/react-select.css";

import { Input, Button, Header, Image, Modal, Dropdown } from 'semantic-ui-react';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            select: {}
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.submitSchool = this.submitSchool.bind(this);
    }


    //deletes a class associated to the user.
    deleteClass(classId) {
        this.props.deleteClass(this.props.user.user_id, classId)
    }

    handleSelect(val) {
        this.setState({
            select: val,
        })
        console.log(this.state.select.label)
    }

    addAssignments(calId, classId) {
        this.setState({
            open: !this.state.open
        })
        console.log('ids', calId, classId)

        this.props.setCalandClassId(calId, classId)
    }

    handleAddAssignment = () => {
        this.setState({
            assignments: this.state.assignments.concat([{ assignment_name: '', points_possible: '', due_date: '', category: '' }])
        });
    }

    handleRemoveAssignment = (idx) => {
        console.log('here')
        // let temp = this.state.assignments
        // temp.splice(idx,1)
        this.setState({
            assignments: this.state.assignments.filter((s, sidx) => idx !== sidx)
        });
    }

    setCurrentIndex(index) {
        this.setState({ currentIndex: index })
        console.log(this.state.currentIndex)
    }

    handleAssignmentChange = (index, field, value) => {
        let tempArr = this.state.assignments

        console.log(value)

        tempArr[index][field] = value;
        //console.log(temp)
        this.setState({
            assignments: tempArr
        })

        console.log(this.state.assignments)
    }

    submitSchool() {
        console.log('submit')
        axios.post(`/api/schools/update/${this.state.select.value}/${this.props.user.user_id}/${this.state.select.label}`).then(res => {
            
        })
    }

    render() {
        console.log(this.props)

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

        return (
            <div className='profile'>
                <SideNav />
                <div className='profile-content'>
                    <span>hello world</span>
                    {this.props.classInfo.length !== 0 ?
                        this.props.classInfo.map((clss, index) => {
                            return (
                                //returns a button for every class with access to the name, subject, and id
                                <div className='edit-class' key={clss.calendar_id}>
                                    <span className='inner'>{clss.class_name}</span>
                                    <span onClick={() => this.deleteClass(clss.calendar_id)}>Unsubscribe</span>
                                </div>
                            )
                        })
                        : null}

                    <span>Admin calendars</span>
                    {console.log(this.props.adminCalendars)}
                    {this.props.adminCalendars.length !== 0 ?
                        this.props.adminCalendars.map((clss, index) => {
                            return (
                                //returns a button for every class with access to the name, subject, and id
                                <div className='edit-class' key={clss.calendar_id}>
                                    <span className='inner'>{clss.calendar_name}</span>
                                    <span onClick={() => this.addAssignments(clss.calendar_id, clss.class_id)}>Add Assignments</span>
                                </div>
                            )
                        })
                        : null}
                   
                    <button onClick={() => this.submitSchool()}>Submit</button>

                    <Select.Async
                        className='fetch'
                        name="form-field-name"
                        value={this.state.select}
                        loadOptions={getOptions}
                        isLoading={isLoadingExternally}
                        onChange={this.handleSelect}

                    />
                </div>


                <Modal open={this.state.open}>
                    <span className='delete' onClick={() => this.addAssignments()}>X</span>
                    <Modal.Header>Join or Create a Class</Modal.Header>
                    <Modal.Content image style={{ padding: '0px' }}>
                        <AddAssignment />
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

//used redux to make the user object acessible.
function mapStateToProps(state) {
    return {
        user: state.user,
        classInfo: state.classInfo,
        adminCalendars: state.adminCalendars,
        all: state
    }
}
export default withRouter(connect(mapStateToProps, { getUser, deleteClass, setCalandClassId })(Profile));