import React, { Component } from 'react';

import Headroom from "react-headroom"
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import "../../../node_modules/animate.css/animate.min.css"
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

import "./macbookPro.css"

import "./Landing.css"
import "./Devices.css"

import logo from "../../assets/due-logo.png"
import lappy from "../../assets/MBP@4x.png"
import iphone from "../../assets/iPhone@4x.png"
import dash from '../../assets/dashboard view.jpg'

import * as Scroll from 'react-scroll';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'




class Landing extends Component {
  constructor(props) {
    super(props)


  }

  componentDidMount() {
    Events.scrollEvent.register('begin', function (to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function (to, element) {
      console.log("end", arguments);
    });

    scrollSpy.update();
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  }
  scrollToBottom = () => {
    scroll.scrollToBottom();
  }
  scrollTo = () => {
    scroll.scrollTo(100);
  }
  scrollMore = () => {
    scroll.scrollMore(100);
  }
  handleSetActive = (to) => {
    console.log(to);
  }

  render() {
    return (
      <div className="Landing" >
        <Element name="top" className="element"></Element>

        <header className="headerL">
          <div className="sideBySideL" >
            <Link to="top" spy={true} smooth={true} offset={-60} duration={800} onSetActive={this.handleSetActive}>
              <img src={logo} className="logo" alt="logo"></img>
              <span className="dueTitle">due.</span>
            </Link>
          </div>
          <div className="sideBySideL">
            <Link className="links" activeClass="active" to="about" spy={true} smooth={true} offset={-30} duration={800} onSetActive={this.handleSetActive}>
              About
            </Link>
            <div className="divider" />
            <Link className="links" activeClass="active" to="how" spy={true} smooth={true} offset={-60} duration={800} onSetActive={this.handleSetActive}>
              How it works
            </Link>
            <div className="divider" />

            <Link className="links" activeClass="active" to="more" spy={true} smooth={true} offset={-60} duration={800} onSetActive={this.handleSetActive}>
              More info
            </Link>

            <a href={process.env.REACT_APP_LOGIN}><button className="login">Login</button></a>
          </div>
        </header>

        <div className="placeholder">
          {/* <ScrollAnimation animateIn="flipInX" animateOut="fadeOut"><img src={iphone} className="iphone" alt="iphone"></img></ScrollAnimation> */}
          {/* <ScrollAnimation animateIn="flipInX" animateOut="fadeOut"><img src={lappy} className="lappy" alt="lappy"></img></ScrollAnimation> */}
          <div className="centeredTextT"><span className="aboveComputer">Never forget another assignment.</span></div>
          <div id="macbook-pro" className="container grid-xl text-center">
            <h3 className="s-title"></h3>
            <div className="columns">
              <div className="column col-12">
                <div className="dots">
                  <div className="dot tooltip" style={{ background: '#e2e3e4' }} data-tooltip="device-silver (default)"></div>
                  <div className="dot tooltip" style={{ background: '#83878a' }} data-tooltip="device-spacegray"></div>
                </div>
              </div>
              <div className="column col-12">
                <div className="device device-macbook-pro device-spacegray">
                  <div className="device-frame">
                    <div className="device-content"></div>
                  </div>

                  <div className="device-stripe"></div>
                  <div className="device-header"></div>
                  <div className="device-sensors"></div>
                  <div className="device-btns"></div>
                  <div className="device-power"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="centeredTextB"><span style={{ fontSize: "3vw" }}>due keeps track of your due dates and to do lists for all of your college classes</span></div>
          <div className="centeredText" style={{ marginTop: '50px' }}><span className="bounce"><Link to="about" spy={true} smooth={true} offset={-30} duration={800} onSetActive={this.handleSetActive}>&#x2572;&#x2571;</Link></span></div>
        </div>
        <Element name="about" className="element">

          <div className="placeholder">
            <span style={{ fontSize: '2vw', marginBottom: '5vh' }}>You know that feeling you get when you walk into class and realize you forgot about the test?</span>
            <span style={{ fontSize: '4vw', marginBottom: '5vh' }}>We're here to fix that.</span>
            <img src={dash} className="dashboardImage" />

          </div>
        </Element>
        <div ></div>
        <Element name="how" className="element">

          <div className="placeholder">
            <span style={{ fontSize: '8vw', marginBottom: '7vh', color: "#222222" }}>How it works</span>

            <span style={{ fontSize: '4vw', marginTop: '7vh' }}>Log in or Sign up ✅</span>
            <span style={{ fontSize: '4vw', marginTop: '7vh' }}>&#x2572;&#x2571;</span>
            <span style={{ fontSize: '4vw', marginTop: '7vh' }}>Select your school 🏫</span>
            <span style={{ fontSize: '4vw', marginTop: '7vh' }}>&#x2572;&#x2571;</span>
            <span style={{ fontSize: '4vw', marginTop: '7vh' }}>Subscribe to a class 🗓</span>
            <span style={{ fontSize: '4vw', marginTop: '7vh' }}>&#x2572;&#x2571;</span>
            <span style={{ fontSize: '4vw', marginTop: '7vh' }}>Never miss another assignment 😎</span>

          </div>
        </Element>

        <div ></div>
        <Element name="more" className="element">

          <div className="placeholder">
            <span style={{ fontSize: '4vw', marginTop: '7vh' }}>If you don't see your class, add it to your school!</span>
            <span style={{ fontSize: '4vw', marginTop: '7vh' }}>Help your fellow classmates out and feel good.</span>
            <span style={{ fontSize: '4vw', marginTop: '7vh' }}>Subscribe to classes and remember due dates.</span>
            <span style={{ fontSize: '4vw', marginTop: '7vh' }}>Be happy because you're getting good grades.</span>
            <a href={process.env.REACT_APP_LOGIN}><button className="lowerLoginButton" >Log in / Sign up</button></a>
          </div>
        </Element>

      </div >
    );
  }
}

export default Landing