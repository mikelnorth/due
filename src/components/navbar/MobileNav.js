import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import profilePic from '../../assets/profile.svg';
import dueLogo from '../../assets/due_logo.svg';
import axios from "axios"
import './MobileNav.css';


class MobileNav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      classNames: []
    };
  }

  componentDidMount() {
    // this.props.getUser()
    axios.get(`/api/classes/getbyclassname/${this.props.user.user_id}`).then(response => {
      console.log(response)
      this.setState({
        classNames: response.data
      })
    })
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    console.log(this.state.classNames)
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            style={{ backgroundColor: "#1485CB" }}
            onClick={this.handleToggle}
          />
          <Drawer
            docked={false}
            width={300}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >
            <MenuItem onClick={this.handleClose}>
              <div className="mobile-user-container">
                <img className="mobile-user-profile-pic" src={this.props.user.user_pic} alt='' />
                <h3 className="mobile-user-name">{this.props.user.user_name}</h3>
              </div>
            </MenuItem>
            {this.state.classNames.length !== 0 ?


              this.state.classNames.map((clss, index) => {
                return (

                  <div>
                    <MenuItem onClick={this.handleClose}>
                      <Link to="classwizard"><div className="user-classes">
                        <p id="add-class-message">{clss.class_name}</p>
                      </div></Link>
                    </MenuItem>
                  </div>
                )
              })
              : null}
            <MenuItem onClick={this.handleClose}>
              <Link to="classwizard"><div className="add-a-class">
                <p id="add-class-message">Add Class +</p>
              </div></Link>
            </MenuItem>
            <div>
              <a href={process.env.REACT_APP_LOGOUT}><button>Logout</button></a>
            </div>
          </Drawer>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, { getUser })(MobileNav);