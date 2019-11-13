import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

import { IoIosPerson } from "react-icons/io"

import { Creators } from "../store/ducks/auth"

import Loading from "../components/loading"
import Notification from "../components/notification"

class Register extends Component {
    state = {
        name: "",
        email: "",
        password: ""
    }

    register() {
        this.props.register(this.state)
        this.setState({
            name: "",
            email: "",
            password: ""
        })
    }
    render() {
        return (
            <>
                <Notification
                    type={this.props.app.message}
                    message={this.props.app.message}
                    dispatch={this.props.dispatch}
                />
                <Loading show={this.props.app.loading} />
                <div className="auth">
                    <div className="auth-wramp">
                        <h1>
                            VUTTR
                            <span>Very Useful Tools to Remember</span>
                        </h1>
                        <div className="auth-form">
                            <div className="auth-form-info">
                                <div className="auth-icon">
                                    <IoIosPerson size={100} />
                                </div>
                                <p>Register</p>
                            </div>

                            <div className="form-fields">
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input
                                            value={this.state.name}
                                            onChange={e => this.setState({ name: e.target.value })}
                                            className="input"
                                            type="text"
                                            placeholder="Type your name"
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">E-Mail</label>
                                    <div className="control">
                                        <input
                                            value={this.state.email}
                                            onChange={e => this.setState({ email: e.target.value })}
                                            className="input"
                                            type="email"
                                            placeholder="Type your e-mail"
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input
                                            value={this.state.password}
                                            onChange={e =>
                                                this.setState({ password: e.target.value })
                                            }
                                            className="input"
                                            type="password"
                                            placeholder="Type your password"
                                        />
                                    </div>
                                </div>
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button
                                            className="button is-link"
                                            onClick={() => this.register()}
                                        >
                                            Register
                                        </button>
                                    </div>
                                    <div className="control">
                                        <Link to="/login" className="button is-link is-light">
                                            Cancel
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    app: state.app
})

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(Creators, dispatch)
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Register)
)
