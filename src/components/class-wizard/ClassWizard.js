import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Select from "react-select";
import "../../../node_modules/react-select/dist/react-select.css";
import { Input } from 'semantic-ui-react';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';



/**
 * Vertical steppers are designed for narrow screen sizes. They are ideal for mobile.
 *
 * To use the vertical stepper with the contained content as seen in spec examples,
 * you must use the `<StepContent>` component inside the `<Step>`.
 *
 * <small>(The vertical stepper can also be used without `<StepContent>` to display a basic stepper.)</small>
 */
class ClassWizard extends Component {
  constructor(props){
    super(props)
      this.state = {
        finished: false,
        stepIndex: 0,
        dateTime: null
      }
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
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  }

  setDate = (dateTime) => this.setState({ dateTime })

  render() {
    const { finished, stepIndex } = this.state;

    function disablePrevDates(startDate) {
      const startSeconds = Date.parse(startDate);
      return (date) => {
        return Date.parse(date) < startSeconds;
      }
    }

    const getOptions = (input) => {
      return fetch(`/users/${input}.json`)
        .then((response) => {
          return response.json();
        }).then((json) => {
          return { options: json };
        });
    }

    let options = "";
    const InputExampleFocus = () => (
      <Input focus placeholder='Search...' />
    )

    const styles = {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
      },
    };

    return (
      <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
        <MuiThemeProvider>
          <Stepper activeStep={stepIndex} orientation="vertical">
            <Step>
              <StepLabel>Find your class</StepLabel>
              <StepContent>
                <span>Search for your class subject</span>
                <Select.Async
                  className='fetch'
                  name="form-field-name"
                  value="one"
                  loadOptions={getOptions}
                />
                <span>Didn't find your class? Press next to create one</span>
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Create class</StepLabel>
              <StepContent>
                <p>Enter class subject</p>
                <Input focus placeholder="Subject" />
                <p>Enter Teacher's name</p>
                <Input focus placeholder="Teacher" />
                <div>
                  <Checkbox
                    label="Simple"
                    style={styles.checkbox}
                  />
                  <Checkbox
                    label="Simple"
                    style={styles.checkbox}
                  />
                  <Checkbox
                    label="Simple"
                    style={styles.checkbox}
                  />
                  <Checkbox
                    label="Simple"
                    style={styles.checkbox}
                  />
                  <Checkbox
                    label="Simple"
                    style={styles.checkbox}
                  />
                  <Checkbox
                    label="Simple"
                    style={styles.checkbox}
                  />
                  <Checkbox
                    label="Simple"
                    style={styles.checkbox}
                  />
                </div>

                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Add Asignments</StepLabel>
              <StepContent>
                <p>Add asignments for this class.</p>
                <Input focus placeholder="Assignment name" />
                <span>When is the due date.</span>
                <DateTimePicker
                  onChange={this.setDate}
                  DatePicker={DatePickerDialog}
                  TimePicker={TimePickerDialog}
                />
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Create an ad</StepLabel>
              <StepContent>
                <p>
                  Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.
              </p>
                {this.renderStepActions(3)}
              </StepContent>
            </Step>
          </Stepper>
          {finished && (
            <p style={{ margin: '20px 0', textAlign: 'center' }}>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({ stepIndex: 0, finished: false });
                }}
              >
                Click here
            </a> to reset the example.
          </p>
          )}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default ClassWizard;