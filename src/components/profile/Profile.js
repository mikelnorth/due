import React, { Component } from 'react';
import './Profile.css'
import { connect } from 'react-redux';
import { getUser, deleteClass } from '../../ducks/reducer';
import SideNav from '../navbar/SideNav.js';
import MobileNav from '../navbar/MobileNav.js';
import axios from 'axios';
import AddAssignment from '../class-modal/AddAssignment.js';
import { withRouter } from 'react-router-dom'
import Select from "react-select";
import "../../../node_modules/react-select/dist/react-select.css";
import MediaQuery from 'react-responsive';
import profilePlaceholder from '../../assets/profile.svg';//placeholder for your profile while there in so uploaded image
import Dropzone from 'react-dropzone';


import { Input, Button, Header, Image, Modal, Dropdown } from 'semantic-ui-react';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            select: null,
            calId: '',
            class_id: '',
            class_name: '',
            imgUrl: ''
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.submitSchool = this.submitSchool.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }


    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", "ugfrpyzw"); // Replace the preset name with your own
            formData.append("api_key", process.env.REACT_APP_CLOUDINARY_KEY); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own green color will be changed) find this url on cloudinary..
            return axios.post("https://api.cloudinary.com/v1_1/dywgm1bra/image/upload", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                axios.get(data.secure_url).then(res => {
                    //this is where you set state to your uploaded imgUrl so it will show up in the turnary <img src={} />
                    this.setState({
                        first_name: '',
                        last_name: '',
                        imgUrl: res.config.url
                    })
                })
            })


        })
        // Once all the files are uploaded
        axios.all(uploaders).then(() => {
            // ... perform after upload is successful operation

        });
    }


    //deletes a class associated to the user.
    deleteClass(classId) {
        this.props.deleteClass(this.props.user.user_id, classId)
    }

    handleSelect(val) {
        this.setState({
            select: val,
        })
    }

    handleUpdate(prop, val) {
        this.setState({
            [prop]: val
        })

    }

    submitSchool() {
        this.state.select ? axios.post(`/api/schools/update/${this.state.select.value}/${this.props.user.user_id}/${this.state.select.label}`) : null

        this.state.first_name ? axios.put(`/api/user/update/firstname/${this.state.first_name}/${this.props.user.user_id}`) : null

        this.state.last_name ? axios.put(`/api/user/update/lastname/${this.state.last_name}/${this.props.user.user_id}`) : null

        this.state.imgUrl ? axios.put(`/api/user/update/img/${this.props.user.user_id}`, this.state) : null

        window.location.reload(true)
    }

    render() {
        const dropZoneStyles = {

        }


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
                <MediaQuery query="(min-width: 1024.1px)">

                    <SideNav />

                    <div className='profile-content'>

                        <div className='edit-profile'>
                            <span className='info-header'>Personal info</span>

                            <div className='info-content'>
                                <div className='info-img'>
                                    <Dropzone
                                        onDrop={this.handleDrop}
                                        multiple
                                        accept="image/*"
                                        style={dropZoneStyles}
                                    ><img className='edit-pic' src={this.state.imgUrl ? this.state.imgUrl : null} alt='' />
                                        <button className='pic-btn'>Edit</button>
                                    </Dropzone>


                                </div>
                                <div>
                                    <div className='info-names'>
                                        <span className='first'>First Name:</span><input onChange={(e) => this.handleUpdate("first_name", e.target.value)} placeholder={this.props.user.first_name}></input>
                                        <span className='last'>Last Name:</span><input onChange={(e) => this.handleUpdate("last_name", e.target.value)} placeholder={this.props.user.last_name}></input>
                                    </div>
                                    <div className='fetch-school-container'>
                                        <span className='change-schools'>Change Schools</span>
                                        <Select.Async
                                            className='fetch-profile'
                                            name="form-field-name"
                                            loadingPlaceholder="Loading Schools..."
                                            placeholder={this.props.user.school_name}
                                            value={this.state.select}
                                            loadOptions={getOptions}
                                            isLoading={isLoadingExternally}
                                            onChange={this.handleSelect}
                                        />
                                        <button className='fetch-btn' onClick={() => this.submitSchool()}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='profile-classes'>
                            {this.props.classInfo.length ? <span>Subscribed Classes</span> : null}
                            <div className='subscribed'>

                                {this.props.classInfo.length !== 0 ?
                                    this.props.classInfo.map((clss, index) => {
                                        return (
                                            //returns a button for every class with access to the name, subject, and id
                                            <div id='remove' className='edit-class' key={clss.calendar_id}>
                                                <span className='inner'>{clss.class_name}</span>
                                                <span onClick={() => this.deleteClass(clss.calendar_id)}>Unsubscribe</span>
                                            </div>

                                        )
                                    })
                                    : null}
                            </div>
                            {this.props.adminCalendars.length ? <span>Edit Your Calendars</span> : null}
                            <div className='admin-classes'>
                                {this.props.adminCalendars.length !== 0 ?
                                    this.props.adminCalendars.map((clss, index) => {
                                        return (
                                            //returns a button for every class with access to the name, subject, and id
                                            <div id='add' className='edit-class' key={clss.calendar_id}>
                                                <span className='inner'>{clss.class_name},  {clss.calendar_name}</span>
                                                <span onClick={() => this.setState({ calId: clss.calendar_id, class_id: clss.class_id, class_name: clss.class_name, open: !this.state.open })}>Add Assignments</span>
                                            </div>
                                        )
                                    })
                                    : null}
                            </div>
                        </div>
                    </div>


                    <Modal open={this.state.open} size={'small'}>
                        <span className='delete' onClick={() => this.setState({ open: !this.state.open })}>X</span>
                        <Modal.Header>Add assignments to:{this.state.class_name}</Modal.Header>
                        <Modal.Content image style={{ padding: '0px' }}>
                            <AddAssignment class_id={this.state.class_id} calId={this.state.calId} />
                        </Modal.Content>
                        <Modal.Actions>
                            <button className='close-modal' onClick={() => this.setState({ open: !this.state.open })}>
                                Close
                            </button>
                        </Modal.Actions>
                    </Modal>

                </MediaQuery>

                <MediaQuery query="(max-width: 1024px)">
                    <MobileNav />

                    <div className='profile-content'>

                        <div className='edit-profile'>
                            <span className='info-header'>Personal info</span>

                            <div className='info-content'>
                                <div className='info-img'>
                                    <Dropzone
                                        onDrop={this.handleDrop}
                                        multiple
                                        accept="image/*"
                                        style={dropZoneStyles}
                                    ><img className='edit-pic' src={this.state.imgUrl ? this.state.imgUrl : null} alt='' />
                                        <button className='pic-btn'>Edit</button>
                                    </Dropzone>


                                </div>
                                <div>
                                    <div className='info-names'>
                                        <span className='first'>First Name:</span><input onChange={(e) => this.handleUpdate("first_name", e.target.value)} placeholder={this.props.user.first_name}></input>
                                        <span className='last'>Last Name:</span><input onChange={(e) => this.handleUpdate("last_name", e.target.value)} placeholder={this.props.user.last_name}></input>
                                    </div>
                                    <div className='fetch-school-container'>
                                        <span className='change-schools'>Change Schools</span>
                                        <Select.Async
                                            className='fetch-profile'
                                            name="form-field-name"
                                            loadingPlaceholder="Loading Schools..."
                                            placeholder={this.props.user.school_name}
                                            value={this.state.select}
                                            loadOptions={getOptions}
                                            isLoading={isLoadingExternally}
                                            onChange={this.handleSelect}
                                        />
                                        <button className='fetch-btn' onClick={() => this.submitSchool()}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='profile-classes'>
                            {this.props.classInfo.length ? <span>Subscribed Classes</span> : null}
                            <div className='subscribed'>

                                {this.props.classInfo.length !== 0 ?
                                    this.props.classInfo.map((clss, index) => {
                                        return (
                                            //returns a button for every class with access to the name, subject, and id
                                            <div id='remove' className='edit-class' key={clss.calendar_id}>
                                                <span className='inner'>{clss.class_name}</span>
                                                <span onClick={() => this.deleteClass(clss.calendar_id)}>Unsubscribe</span>
                                            </div>

                                        )
                                    })
                                    : null}
                            </div>
                            {this.props.adminCalendars.length ? <span>Edit Your Calendars</span> : null}
                            <div className='admin-classes'>
                                {this.props.adminCalendars.length !== 0 ?
                                    this.props.adminCalendars.map((clss, index) => {
                                        return (
                                            //returns a button for every class with access to the name, subject, and id
                                            <div id='add' className='edit-class' key={clss.calendar_id}>
                                                <span className='inner'>{clss.class_name},  {clss.calendar_name}</span>
                                                <span onClick={() => this.setState({ calId: clss.calendar_id, class_id: clss.class_id, class_name: clss.class_name, open: !this.state.open })}>Add Assignments</span>
                                            </div>
                                        )
                                    })
                                    : null}
                            </div>
                        </div>
                    </div>


                    <Modal open={this.state.open} size={'small'}>
                        <span className='delete' onClick={() => this.setState({ open: !this.state.open })}>X</span>
                        <Modal.Header>Add assignments to:{this.state.class_name}</Modal.Header>
                        <Modal.Content image style={{ padding: '0px' }}>
                            <AddAssignment class_id={this.state.class_id} calId={this.state.calId} />
                        </Modal.Content>
                        <Modal.Actions>
                            <button className='close-modal' onClick={() => this.setState({ open: !this.state.open })}>
                                Close
                            </button>
                        </Modal.Actions>
                    </Modal>

                </MediaQuery>
            </div >
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
export default withRouter(connect(mapStateToProps, { getUser, deleteClass })(Profile));