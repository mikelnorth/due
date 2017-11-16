import React, { Component } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import ReactModal from "react-modal";
import { getUser } from '../../ducks/reducer'
import Select from "react-select";
import "../../../node_modules/react-select/dist/react-select.css";

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            showModal: true,
            hideModal: false,
            select: ''
        }

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

    }

    componentWillMount() {
        this.props.getUser()
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        newProps.user.school_id ? this.handleCloseModal() : this.handleOpenModal()

    }
    handleOpenModal() {
        this.setState({
            showModal: true,
            hideModal: !this.state.hideModal
        })
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
            hideModal: !this.state.hideModal

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
        this.state.select ? this.handleCloseModal() : this.handleOpenModal()
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

        var options = [
            { value: 1111, label: 'University of Utah' },
            { value: 2222, label: 'Utah Valley University' },
            { value: 3333, label: 'Brigham Young University' },
            { value: 4444, label: 'Southern Utah University' },
            { value: 5555, label: 'Snow College' },
            { value: 6666, label: 'Dixie State' },
        ];
        return (
            <div className='dashboard'>
                <p>welcome to the dashboard</p>
                <a href={process.env.REACT_APP_LOGOUT}><button>Logout</button></a>
                <div>
                    {/* <button onClick={ this.handleOpenModal }>Open</button> */}
                    <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="onRequestClose Example"
                        onRequestClose={this.handleCloseModal}
                        className='Modal'
                        overlayClassName='Overlay'>
                        <h4>What School do you attend?</h4>
                        {/* <input onChange={(e) => this.handlChange( e.target.value)}></input> */}
                        <Select
                            className='school-select'
                            name="form-field-name"
                            placeholder="Select A School"
                            value={this.state.select}
                            options={options}
                            onChange={this.handleSelect}
                        />
                        <Select.Async
                            name="form-field-name"
                            value="one"
                            loadOptions={getOptions}
                        />
                        <button onClick={() => this.submit()}>Submit</button>
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