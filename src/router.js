import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/landing/Landing.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import Class from "./components/class/Class.js";
import ClassWizard from "./components/class-wizard/ClassWizard";
import Join from "./components/join-class/Join.js";
import Profile from "./components/profile/Profile.js";
import MobileNav from "./components/navbar/MobileNav";
import SideNav from "./components/navbar/SideNav";
import ClassModal from "./components/class-modal/ClassModal";

export default (
    <div>
        <Switch>
            <Route component={Landing} exact path='/' />
            <Route component={Dashboard} path='/dashboard' />
            <Route component={Class} path='/class' />
            <Route component={ClassWizard} path='/classwizard' />
            <Route component={Join} path='/join' />
            <Route component={Profile} path='/profile' />
            <Route component={SideNav} path='/side' />
            <Route component={MobileNav} path='/mobilenav' />
            <Route component={ClassModal} path="/classmodal"/>
            <Route component={Profile} path="/profile"/>            
        </Switch>
    </div>
)