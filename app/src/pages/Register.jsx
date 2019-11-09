import React, { Component } from "react"
import { IoIosPerson } from "react-icons/io"
class Register extends Component {
    render() {
        return (
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
                            <div class="field">
                                <label class="label">Name</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Type your name" />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">E-Mail</label>
                                <div class="control">
                                    <input
                                        class="input"
                                        type="email"
                                        placeholder="Type your e-mail"
                                    />
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Password</label>
                                <div class="control">
                                    <input
                                        class="input"
                                        type="password"
                                        placeholder="Type your password"
                                    />
                                </div>
                            </div>
                            <div class="field is-grouped">
                                <div class="control">
                                    <button class="button is-link">Register</button>
                                </div>
                                <div class="control">
                                    <button class="button is-link is-light">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
