import React from "react"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import history from "./history"

import Tool from "../pages/Tool"
import Login from "../pages/Login"
import Register from "../pages/Register"

const isAuthenticated = () => {
    if (localStorage.getItem("token")) {
        return true
    }
    return false
}
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
        }
    />
)

const Routes = () => (
    <div className="App">
        <div className="app-wrapper">
            <Router history={history}>
                <Switch>
                    <PrivateRoute exact path="/" component={Tool} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="*" component={() => <h1>Page not found</h1>} />
                </Switch>
            </Router>
        </div>
    </div>
)

export default Routes
