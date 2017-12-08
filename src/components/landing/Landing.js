import React, { Component } from 'react';

import Headroom from "react-headroom"
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import "../../../node_modules/animate.css/animate.min.css"
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";


import "./Landing.css"
import "./Devices.css"

import logo from "../../assets/due-logo.png"
import lappy from "../../assets/MBP@4x.png"
import iphone from "../../assets/iPhone@4x.png"



class Landing extends Component {
  constructor(props) {
    super(props)
    this.goToTop = this.goToTop.bind(this)
    this.setAboutNode = this.setAboutNode.bind(this)
    this.setHowNode = this.setHowNode.bind(this)


  }

  setTopNode = (node) => {
    if (node) {
      this._TopNode = node
    }
  }

  setAboutNode = (node) => {
    if (node) {
      this._aboutNode = node
    }
  }

  setHowNode = (node) => {
    if (node) {
      this._HowNode = node
    }
  }

  goToTop = (event) => {
    event.preventDefault()

    // Passing the dom node from react is all you need for this to work
    scrollIntoViewIfNeeded(this._TopNode, {
      duration: 500,
      easing: 'easeIn'
    })
  }

  goToAbout = (event) => {
    event.preventDefault()

    // Passing the dom node from react is all you need for this to work
    scrollIntoViewIfNeeded(this._aboutNode, {
      duration: 500,
      easing: 'easeIn'
    })
  }

  goToHow = (event) => {
    event.preventDefault()

    // Passing the dom node from react is all you need for this to work
    scrollIntoViewIfNeeded(this._HowNode, {
      duration: 500,
      easing: 'easeIn'
    })
  }

  render() {
    return (
      <div className="Landing" >
        <div ref={this.setTopNode}></div>

        <header className="headerL">
          <div className="sideBySideL" onClick={this.goToTop}>
            <img src={logo} className="logo" alt="logo"></img>
            <span className="dueTitle">due.</span>
          </div>
          <div className="sideBySideL">
            <span className="links" onClick={this.goToAbout}>About</span>
            <div className="divider" />
            <span className="links" onClick={this.goToHow}>How it works</span>
            <div className="divider" />

            <span className="links" onClick={this.goToMore}>More info</span>

            <a href={process.env.REACT_APP_LOGIN}><button className="login">Login</button></a>
          </div>
        </header>
        <div className="placeholder">
          {/* <ScrollAnimation animateIn="flipInX" animateOut="fadeOut"><img src={iphone} className="iphone" alt="iphone"></img></ScrollAnimation> */}
          {/* <ScrollAnimation animateIn="flipInX" animateOut="fadeOut"><img src={lappy} className="lappy" alt="lappy"></img></ScrollAnimation> */}
          <div style={{marginTop: '100px'}}>
            <div className="marvel-device iphone-x">
              <div className="notch">
                <div className="camera"></div>
                <div className="speaker"></div>
              </div>
              <div className="top-bar"></div>
              <div className="sleep"></div>
              <div className="bottom-bar"></div>
              <div className="volume"></div>
              <div className="overflow">
                <div className="shadow shadow--tr"></div>
                <div className="shadow shadow--tl"></div>
                <div className="shadow shadow--br"></div>
                <div className="shadow shadow--bl"></div>
              </div>
              <div className="inner-shadow"></div>
              <div className="screen">
                <img src={logo} style={{width: '275px', marginTop: '250px'}}/>
            </div>
            </div>
          </div>
        </div>
        <div className="placeholder">
          About

        </div>
        <div ref={this.setAboutNode}></div>
        <div className="placeholder">
          How It Works
        </div>
        <div ref={this.setHowNode}></div>
        <div className="placeholder">
          More Info
        </div>
      </div>
    );
  }
}

export default Landing