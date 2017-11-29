// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import './ClassWizard.css';
// import Select from "react-select";
// import "../../../node_modules/react-select/dist/react-select.css";
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
// import Checkbox from 'material-ui/Checkbox';
// import DateTimePicker from 'material-ui-datetimepicker';
// import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
// import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
// import { Input, Button, Header, Image, Modal } from 'semantic-ui-react';
// import MediaQuery from 'react-responsive';
// import axios from "axios";
// import {Link} from 'react-router-dom';





// /**
//  * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
//  *
//  * To use the vertical stepper with the contained content as seen in spec examples,
//  * you must use the `<StepContent>` component inside the `<Step>`.
//  *
//  * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
//  */
// class ClassWizard extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       finished: false,
//       stepIndex: 0,
//       dateTime: null,
//       subject: '',
//       options: [],
//       selectedClass: ''

//     }
//     this.handleClassChange = this.handleClassChange.bind(this);
//     this.handleSelect = this.handleSelect.bind(this);
//   }

//   componentDidMount() {
//     //console.log(this.props.user.school)
//     axios.get(`/api/classes/get/${this.props.user.school_id}`).then(response => {
//       this.setState({
//         options: response.data
//       })
//       //console.log('classWizard',response.data)
//     })
//   }

//   handleSelect(val) {
//     this.setState({
//       selectedClass: val,
//     })
//     //console.log("select state", this.state.selectedClass)
//     // //console.log("select state", this.state.select.label)
//   }

//   handleClassChange(val) {
//     this.setState({
//       subject: val
//     })
//     //console.log(this.state.subject)
//   }

//   handleNext = () => {
//     const { stepIndex } = this.state;
//     this.setState({
//       stepIndex: stepIndex + 1,
//       finished: stepIndex >= 2,
//     });
//   };

//   handlePrev = () => {
//     const { stepIndex } = this.state;
//     if (stepIndex > 0) {
//       this.setState({ stepIndex: stepIndex - 1 });
//     }
//   };


//   renderStepActions(step) {
//     const { stepIndex } = this.state;

//     return (
//       <div style={{ margin: '12px 0' }}>
//         <RaisedButton
//           label={stepIndex === 2 ? 'Finish' : 'Next'}
//           disableTouchRipple={true}
//           disableFocusRipple={true}
//           primary={true}
//           onClick={this.handleNext}
//           style={{ marginRight: 12 }}
//         />
//         {step > 0 && (
//           <FlatButton
//             label="Back"
//             disabled={stepIndex === 0}
//             disableTouchRipple={true}
//             disableFocusRipple={true}
//             onClick={this.handlePrev}
//           />
//         )}
//       </div>
//     );
//   }

//   setDate = (dateTime) => {
//     this.setState({ dateTime })
//     //console.log(dateTime)
//   }

//   render() {
//     const { finished, stepIndex } = this.state;

//     const styles = {
//       block: {
//         maxWidth: 250,
//       },
//       checkbox: {
//         marginBottom: 16,
//       },
//     };

//     return (
//       <div className='mobile-stepper' style={{margin: 'auto' }}>
//         <MuiThemeProvider>
//           <Stepper activeStep={stepIndex} orientation="vertical">
//             <Step>
//               <StepLabel>Find your class</StepLabel>
//               <StepContent>
//                 <span>Search for your class subject</span>
//                 <div style={{height: '150px'}}><Select
//                   className='school-select'
//                   name="form-field-name"
//                   placeholder="Select a class"
//                   value={this.state.selectedClass}
//                   options={this.state.options}
//                   onChange={this.handleSelect}
//                 /></div>
//                 {this.state.selectedClass ? <Link to='/join'><span>Find Teachers</span></Link> :
//                   <div>
//                     <span>Didn't find your class? Press next to create one</span>
//                     {this.renderStepActions(0)}
//                 </div>
//                 }
//               </StepContent>
//             </Step>
//             <Step>
//               <StepLabel>Create class</StepLabel>
//               <StepContent>
//                 <p>Enter class subject</p>
//                 <Input focus placeholder="Subject"  />
//                 <p>Enter Teacher's name</p>
//                 <Input focus placeholder="Teacher" />
//                 <div>
//                   <Checkbox
//                     label="M"
//                     value='M'
//                     style={styles.checkbox}
//                     // onChange={handleCheckbox}
//                   />
//                   <Checkbox
//                     label="T"
//                     style={styles.checkbox}
//                   />
//                   <Checkbox
//                     label="W"
//                     style={styles.checkbox}
//                   />
//                   <Checkbox
//                     label="TH"
//                     style={styles.checkbox}
//                   />
//                   <Checkbox
//                     label="F"
//                     style={styles.checkbox}
//                   />
//                   <Checkbox
//                     label="ST"
//                     style={styles.checkbox}
//                   />
//                   <Checkbox
//                     label="SU"
//                     style={styles.checkbox}
//                   />
//                 </div>

//                 {this.renderStepActions(1)}
//               </StepContent>
//             </Step>
//             <Step>
//               <StepLabel>Add Asignments</StepLabel>
//               <StepContent>
//                 <p>Add asignments for this class.</p>
//                 <Input focus placeholder="Assignment name" />
//                 <Input focus placeholder="How many points?" type='number' /><br />
//                 <span>When is the due date</span>
//                 <DateTimePicker
//                   placeholder='date/time'
//                   onChange={this.setDate}
//                   DatePicker={DatePickerDialog}
//                   TimePicker={TimePickerDialog}
//                 />
//                 {this.renderStepActions(2)}
//               </StepContent>
//             </Step>
//           </Stepper>
//         </MuiThemeProvider>

//       </div>
//     );
//   }
// }
// function mapStatetoProps(state) {
//   return {
//     user: state.user,
//     email: state.email
//   }
// }

// export default (connect(mapStatetoProps)(ClassWizard))

import React, { Component } from 'react'
import ClassModal from '../class-modal/ClassModal'

class ClassWizard extends Component {


  render() {
    return(
      <div>
        <ClassModal />
      </div>
    )
  }
}

export default ClassWizard;