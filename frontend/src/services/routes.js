import React from 'react'
import {
    Switch,
    Route,
    BrowserRouter,
} from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location';

import ChatOnline from '../components/chat'
import User from '../components/user'
import Homepage from '../components/homepage'
import { NotFound, ChatRoute, LoginRoute } from './customized-routes'

export default function RouteConfig() {
    return (   
        <BrowserRouter>
            <LastLocationProvider>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <LoginRoute exact path="/user" component={User}/>
                    <ChatRoute exact path="/chat" component={ChatOnline}/>
                    <NotFound />
                </Switch>
            </LastLocationProvider>
        </BrowserRouter>
    )
}