import React, { Component } from "react"
import { connect } from 'react-redux';
import './ClassModal.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { withRouter } from 'react-router-dom'

import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import {  Button } from 'semantic-ui-react';
// import MediaQuery from 'react-responsive';
import axios from "axios";

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import 'font-awesome/css/font-awesome.min.css';





const muiTheme = getMuiTheme({
    palette: {
        primary1Color: "#1485CB",
        primary2Color: "#1485CB",
        primary3Color: "#1485CB",
        accent1Color: "#1485CB",
        accent2Color: "#1485CB",
        accent3Color: "#1485CB"
    },
});

class AddAssignment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            finished: false,
            stepIndex: 0,
            assignments: [{ assignment_name: '', points_possible: '', due_date: '', category: null }],
            categoryOptions: [{ key: '1', value: '1', text: 'Essay' }, { key: '2', value: '2', text: 'Test' }],
            currentIndex: null,
        }

        this.handleAddAssignment = this.handleAddAssignment.bind(this);
        this.handleRemoveAssignment = this.handleRemoveAssignment.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.setCurrentIndex = this.setCurrentIndex.bind(this);
    }

    componentDidMount(){
        this.setState({
            calId: this.props.calId,
            class_id: this.props.class_id
        })
    }

    setCurrentIndex(index) {
        this.setState({ currentIndex: index })
        //console.log(this.state.currentIndex)
    }


    setDate = (dateTime) => {
        this.setState({ dateTime })
        //console.log(dateTime)
    }

    handleAddAssignment = () => {
        this.setState({
            assignments: this.state.assignments.concat([{ assignment_name: '', points_possible: '', due_date: '', category: '' }])
        });
    }

    handleAssignmentChange = (index, field, value) => {
        let tempArr = this.state.assignments

        //console.log(value)

        tempArr[index][field] = value;
        ////console.log(temp)
        this.setState({
            assignments: tempArr
        })

        //console.log(this.state.assignments)
    }

    handleRemoveAssignment = (idx) => {
        //console.log('here')
        // let temp = this.state.assignments
        // temp.splice(idx,1)
        this.setState({
            assignments: this.state.assignments.filter((s, sidx) => idx !== sidx)
        });
    }

    handleSelectChange = (event, index, value) => {
        //console.log('event', event)
        //console.log('index', index)
        //console.log('value', value)

        let temp = this.state.assignments
        //console.log(temp)


        //console.log(this.state.currentIndex)

        var tempIndex = this.state.currentIndex
        temp[tempIndex].category = value
        this.setState({ assignments: temp })
        //console.log(this.state.assignments)

    }

    submitAssignments() {
        //console.log('assignments', this.state.assignments)

        axios.post(`/api/assignments/add/${this.state.class_id}/${this.state.calId}`, this.state.assignments).then(response => {
            //console.log("Got to assignments response.")
            axios.post(`/api/assignments/add/user/assignments/${this.props.user.user_id}/${this.state.class_id}/${this.state.calId}`).then(response => {
                //console.log("Added to User Assignment: ", response)
                window.location.reload(true)

            })
        })
    }

    renderStepActions(step) {
        //const { stepIndex } = this.state;

        return (
            <div style={{ margin: '12px 0' }}>
                <RaisedButton
                    label={'Submit'}
                    disableTouchRipple={false}
                    disableFocusRipple={false}
                    primary={true}
                    onClick={() => this.submitAssignments()}
                    style={{ marginRight: 12 }}
                />

            </div>
        );
    }

    render() {
        //console.log(this.props)
        const {  stepIndex } = this.state;

        return (
            <div className='stepper-add' >
                <div className="yScroll">

                    <MuiThemeProvider muiTheme={muiTheme} >
                        <Stepper activeStep={stepIndex} orientation="vertical">
                            <Step>
                                <StepLabel>Add Asignments</StepLabel>
                                <StepContent>
                                    {this.state.assignments.map((assignments, index) => {
                                        return (


                                            <div className="assignmentInput">
                                                <TextField className="name"
                                                    focus placeholder="Assignment name"
                                                    value={this.state.assignments[index].assignment_name}
                                                    onChange={(e) => this.handleAssignmentChange(index, "assignment_name", e.target.value)} />
                                                <TextField className="points"
                                                    focus placeholder="Points"
                                                    value={this.state.assignments[index].points_possible}
                                                    type='number' min="0" onChange={(e) => this.handleAssignmentChange(index, "points_possible", e.target.value)} />
                                                <DateTimePicker
                                                    className="dateTime"
                                                    format='MMM DD, YYYY hh:mm A'
                                                    value={this.state.assignments[index].due_date}
                                                    placeholder='Due Date'
                                                    onChange={this.setDate}
                                                    DatePicker={DatePickerDialog}
                                                    TimePicker={TimePickerDialog}
                                                    onChange={(e) => this.handleAssignmentChange(index, "due_date", e)}
                                                />
                                                {/* <Dropdown placeholder='Category' search selection options={this.state.categoryOptions} value={this.state.assignments[index].category} onChange={(e, { value }) => this.handleAssignmentChange(index, "category", value)}/> */}
                                                <SelectField
                                                    className="categorySelect"
                                                    floatingLabelText=""
                                                    value={this.state.assignments[index].category}
                                                    onClick={() => this.setCurrentIndex(index)}
                                                    onChange={this.handleSelectChange}
                                                // onChange={this.handleSelectChange}
                                                >
                                                    <MenuItem value={1} primaryText="Essay" />
                                                    <MenuItem value={2} primaryText="Test" />
                                                    <MenuItem value={3} primaryText="Quiz" />
                                                    <MenuItem value={4} primaryText="HW" />
                                                </SelectField>
                                                <Button onClick={() => this.handleRemoveAssignment(index)} id="delete">-</Button>
                                            </div>
                                        )
                                    })}
                                    <Button onClick={() => this.handleAddAssignment()}>ADD</Button>
                                    {this.renderStepActions(2)}
                                </StepContent>
                            </Step>
                        </Stepper>
                    </MuiThemeProvider>
                </div>
            </div>

        );
    }
}
function mapStatetoProps(state) {
    return {
        user: state.user,
        email: state.email,
        calendarId: state.calendarId,
        classId: state.classId,
    }
}

export default withRouter((connect(mapStatetoProps)(AddAssignment)))