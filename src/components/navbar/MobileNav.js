import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';


export default class MobileNav extends React.Component {
    
      constructor(props) {
        super(props);
        this.state = {open: false};
      }
    
      handleToggle = () => this.setState({open: !this.state.open});
    
      handleClose = () => this.setState({open: false});
    
      render() {
        return (
          <div>
            <MuiThemeProvider>
                <AppBar
                title="due."
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                style={{backgroundColor: "#1485CB"}}
                onClick={this.handleToggle}
                />
                <Drawer
                docked={false}
                width={300}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
                >
                <MenuItem onClick={this.handleClose}><Link to="/">Home</Link></MenuItem>
                <MenuItem onClick={this.handleClose}><Link to="/dashboard">Dashboard</Link></MenuItem>
                </Drawer>
            </MuiThemeProvider>
          </div>
        );
      }
    }