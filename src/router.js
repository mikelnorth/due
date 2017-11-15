import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/landing/Landing.js";
import Dashboard from "./components/dashboard/Dashboard.js";
import Class from "./components/class/Class.js";
import Create from "./components/create-class/Create.js";
import Join from "./components/join-class/Join.js";
import Profile from "./components/profile/Profile.js";

export default (
    <div>
        <Switch>
            <Route component={Landing} exact path='/' />
            <Route component={Dashboard} path='/dashboard' />
            <Route component={Class} path='/class' />
            <Route component={Create} path='/class/create' />
            <Route component={Join} path='/class/join' />
            <Route component={Profile} path='/profile' />
        </Switch>
    </div>
)