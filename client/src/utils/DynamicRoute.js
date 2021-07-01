import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from './auth';


const DynamicRoute = (props) => {
    const { user } = useAuthState()
    if (props.authenticated && !user) {
        return <Redirect to="/login" />
    } else {
        return <Route component={props.component} {...props} />
    }
}

export default DynamicRoute
