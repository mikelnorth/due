import React, { Component } from "react"
import { connect } from 'react-redux';
import './ClassModal.css';
import Select from "react-select";
import "../../../node_modules/react-select/dist/react-select.css";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import { Input, Button, Header, Image, Modal, Dropdown } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import axios from "axios";
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import Join from '../../components/join-class/Join';
import {CirclePicker} from 'react-color';
import 'font-awesome/css/font-awesome.min.css';



import { lightblue600 } from 'material-ui/styles/colors';


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

class ClassModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            finished: false,
            stepIndex: 0,
            dateTime: null,
            subject: '',
            options: [],
            selectedClass: '',
            assignments: [{ assignment_name: '', points_possible: '', due_date: '', category: null }],
            categoryOptions: [{ key: '1', value: '1', text: 'Essay' }, { key: '2', value: '2', text: 'Test' }],
            currentIndex: null,
            open: false,
            teacher: '',
            currentClassId: null,
            currentCalendarId: null,
            classes: [],
            cal_id: null,
            days: [],
            M: false,
            T: false,
            W: false,
            TH: false,
            F: false,
            ST: false,
            SU: false,
            background: '#1485CB',
            displayColorPicker: false,
            
        }
        this.handleClassChange = this.handleClassChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleAddAssignment = this.handleAddAssignment.bind(this);
        this.handleRemoveAssignment = this.handleRemoveAssignment.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.submitClassAndCal = this.submitClassAndCal.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.addDays = this.addDays.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);        
        this.handleClose = this.handleClose.bind(this)  
        this.handleCloseDialog = this.handleCloseDialog.bind(this)      

    }



    componentDidMount() {
        console.log(this.props.user.school)
        axios.get(`/api/classes/get/${this.props.user.school_id}`).then(response => {
            this.setState({
                options: response.data
            })
            console.log('ClassModal', response.data)
        })
    }

    addDays(){
        this.state.M ? this.state.days.push(this.state.M) : null;
        this.state.T ? this.state.days.push(this.state.T) : null;
        this.state.W ? this.state.days.push(this.state.W) : null;
        this.state.TH ? this.state.days.push(this.state.TH) : null;
        this.state.F ? this.state.days.push(this.state.F) : null;
        this.state.ST ? this.state.days.push(this.state.ST) : null;
        this.state.SU ? this.state.days.push(this.state.SU) : null;

        console.log(this.state)
    }

    handleSelect(val) {
        this.setState({
            selectedClass: val,
        })
        console.log("select state", this.state.selectedClass)
        // console.log("select state", this.state.select.label)
    }

    handleClassChange(val) {
        this.setState({
            subject: val
        })
        console.log('Subject: ', this.state.subject)
    }

    handleTeacherChange(val) {
        this.setState({
            teacher: val
        })
        console.log(this.state.teacher)
    }

    handleNext = () => {
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };

    renderStepActions(step) {
        const { stepIndex } = this.state;

        return (
            <div style={{ margin: '12px 0' }}>
                <RaisedButton
                    label={stepIndex === 2 ? 'Submit' : 'Next'}
                    disableTouchRipple={false}
                    disableFocusRipple={false}
                    primary={true}
                    onClick={stepIndex === 2 ? () => this.submitAssignments() : stepIndex === 1 ? (() => {this.handleOpen(); this.addDays()}) : this.handleNext}
                    style={{ marginRight: 12 }}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0 || stepIndex === 2}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    setDate = (dateTime) => {
        this.setState({ dateTime })
        console.log(dateTime)
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

    submitAssignments() {
        console.log('assignments', this.state.assignments)
        axios.post(`/api/usercalendar/add/${this.props.user.user_id}/${this.state.currentCalendarId}/${this.state.background.replace(/\#/g, '')}`).then(response => {
            console.log("Added to user calendars.")
        })
        axios.post(`/api/assignments/add/${this.state.currentClassId}/${this.state.currentCalendarId}`, this.state.assignments).then(response => {
            console.log("Got to assignments response.")
            axios.post(`/api/assignments/add/user/assignments/${this.props.user.user_id}/${this.state.currentClassId}/${this.state.currentCalendarId}`).then(response => {
                console.log("Added to User Assignment: ", response)
                window.location.reload(true)
                
            })
        })
    }

    handleSelectChange = (event, index, value) => {
        console.log('event', event)
        console.log('index', index)
        console.log('value', value)

        let temp = this.state.assignments
        console.log(temp)


        console.log(this.state.currentIndex)

        var tempIndex = this.state.currentIndex
        temp[tempIndex].category = value
        this.setState({ assignments: temp })
        console.log(this.state.assignments)

    }

    handleCheckbox(val, prop){
        val ?
        this.setState({
            [prop]: prop
        }) :
        this.setState({
            [prop]: val
        })
        console.log(this.state)
    }

    setCurrentIndex(index) {
        this.setState({ currentIndex: index })
        console.log(this.state.currentIndex)
    }


    handleOpen = () => {
        console.log('handle open got hit')
        this.setState({ open: true });
    };



    handleCloseDialog() {
        console.log("Close hit")
        this.setState({open: !this.state.open})
    }

    submitClassAndCal() {

        let calendarInfo = {
            calendar_name: this.state.teacher,
            days: this.state.days
        }

        console.log('subject', this.state.subject)
        axios.post(`/api/classes/add/${this.state.subject}/${this.props.user.school_id}`).then(
            response => {
                console.log('response data', response.data)
                this.setState({ currentClassId: response.data[0].class_id })
                console.log(this.state.background)
                axios.post(`/api/calendars/add/${this.props.user.user_id}/${response.data[0].class_id}/${this.state.background.replace(/\#/g, '')}`, calendarInfo).then(response => {
                    console.log(response.data)
                    this.setState({ currentCalendarId: response.data[0].calendar_id })
                })

            }
        )

        this.setState({
            stepIndex: 2,
            open: false
        })



    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
      };
    
      handleClose = () => {
        this.setState({ displayColorPicker: false })
      };
    
      handleChangeComplete = (color) => {
        this.setState({ background: color.hex,
            displayColorPicker: !this.state.displayColorPicker
        });
        console.log(this.state.background)
      };
    

    render() {
        const { finished, stepIndex } = this.state;

        const styles = {
            block: {
                maxWidth: 250,
            },
            checkbox: {
                width: '7%',
            },
        };

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCloseDialog}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={false}
                onClick={this.submitClassAndCal}
            />,
        ];

        const popover = {
            position: 'relative',
            zIndex: '2',
          }

          const cover = {
            float: 'right',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          }

        return (
            <div className='stepper' >
                <div className="yScroll">

                    <MuiThemeProvider muiTheme={muiTheme} >
                        <Stepper activeStep={stepIndex} orientation="vertical">
                            <Step>
                                <StepLabel>Find your class</StepLabel>
                                <StepContent>
                                    <span>Search for your class subject</span>
                                    <div style={{ height: '150px' }}><Select
                                        className='school-select'
                                        name="form-field-name"
                                        placeholder="Select a class"
                                        value={this.state.selectedClass}
                                        options={this.state.options}
                                        onChange={this.handleSelect}
                                    /></div>

                                    {this.state.selectedClass ?
                                        <Join
                                            class_id={this.state.currentClassId}
                                            classForJoin={this.state.selectedClass}
                                            selectTeachForClass={this.state.class}
                                            selectTeachForCal={this.state.cal_id} />
                                        :
                                        <div>
                                            <span>Didn't find your class? Press next to create one</span>
                                            {this.renderStepActions(0)}
                                        </div>
                                    }

                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>Create class</StepLabel>
                                <StepContent>
                                    <div className='step2-contianer'>
                                        <div className="sideBySide">
                                            <TextField focus placeholder="Enter class subject" onChange={(e) => this.handleClassChange(e.target.value)} />
                                            <TextField focus placeholder="Enter teacher" onChange={(e) => this.handleTeacherChange(e.target.value)} />
                                            {this.state.displayColorPicker ? null : <div>
                                            <span>Select calendar color</span><i className="fa fa-circle fa-3x" aria-hidden="true" 
                                            style={{color: this.state.background}} onClick={ this.handleClick }></i></div>}
                                            { this.state.displayColorPicker ? <div style={ popover }>
                                            <div style={ cover } onClick={ this.handleClose }/>
                                            <CirclePicker color={ this.state.background }
                                                onChangeComplete={ this.handleChangeComplete } />
                                            </div> : null }
                                        </div>
                                        <div className="checkbox-sideBySide">
                                            <Checkbox
                                                label="M"
                                                value='M'
                                                style={styles.checkbox}
                                                onCheck={(e, val) => this.handleCheckbox(val, "M")}
                                            />
                                            <Checkbox
                                                label="T"
                                                style={styles.checkbox}
                                                onCheck={(e, val) => this.handleCheckbox(val, "T")}
                                            />
                                            <Checkbox
                                                label="W"
                                                style={styles.checkbox}
                                                onCheck={(e, val) => this.handleCheckbox(val, "W")}
                                            />
                                            <Checkbox
                                                label="TH"
                                                style={styles.checkbox}
                                                onCheck={(e, val) => this.handleCheckbox(val, "TH")}
                                            />
                                            <Checkbox
                                                label="F"
                                                style={styles.checkbox}
                                                onCheck={(e, val) => this.handleCheckbox(val, "F")}
                                            />
                                            <Checkbox
                                                label="ST"
                                                style={styles.checkbox}
                                                onCheck={(e, val) => this.handleCheckbox(val, "ST")}
                                            />
                                            <Checkbox
                                                label="SU"
                                                style={styles.checkbox}
                                                onCheck={(e, val) => this.handleCheckbox(val, "SU")}
                                            />
                                            <Dialog
                                                title="Are you sure?"
                                                actions={actions}
                                                modal={true}
                                                open={this.state.open}
                                                
                                            >
                                                Once submitted, You cannot return to step(s) 1 & 2.
                                            </Dialog>
                                        </div>


                                        {this.renderStepActions(1)}
                                    </div>
                                </StepContent>
                            </Step>
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
        email: state.email
    }
}

export default (connect(mapStatetoProps)(ClassModal))