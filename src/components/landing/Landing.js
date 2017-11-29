import React, { Component } from 'react';

import Headroom from "react-headroom"
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import "../../../node_modules/animate.css/animate.min.css"
//import ScrollAnimation from 'react-animate-on-scroll';

import "./Landing.css"
import logo from "../../assets/due-logo.png"
import lappy from "../../assets/Stuff.png"
import iphone from "../../assets/iPhone X.png"



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
      this._howNode = node
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
    scrollIntoViewIfNeeded(this._aboutNode, {
      duration: 500,
      easing: 'easeIn'
    })
  }

  render() {
    return (
      <div className="Landing" >
        <div ref={this.setTopNode}></div>

        <Headroom
          
          style={{
            height: 60,
            background: 'rgba(0, 0, 255, 1)',
            boxShadow: '1px 1px 1px rgba(0,0,0,0.25)',
          }}
        >
          <header>
            <div className="sideBySide" onClick={this.goToTop}>
              <img src={logo} className="logo" alt="logo"></img>
              <span className="dueTitle">due.</span>
            </div>
            <div className="sideBySide">
              <span className="links" onClick={this.goToAbout}>About</span>
              <span className="links" onClick={this.goToHow}>How it works</span>
              <span className="links">More info</span>

              <a href={process.env.REACT_APP_LOGIN}><button className="login">Login</button></a>
            </div>
          </header>
        </Headroom>
        <div className="placeholder">
          <img src={iphone} className="iphone" alt="iphone"></img>
          <img src={lappy} className="lappy" alt="lappy"></img>
        </div>
        <div className="placeholder">
        </div>

        <div className="placeholder">
          <div ref={this.setAboutNode}></div>

        </div>

        <div className="placeholder">


        </div>
        <div ref={this.setHowNode}></div>
      </div>
    );
  }
}

export default Landing