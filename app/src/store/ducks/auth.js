import api from "../../utils/api"
import history from "../../routes/history"

import { loadding, notification } from "./app"
export const Types = {
    LOGIN: "auth/login",
    REGISTER: "auth/register"
}

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export const Creators = {
    login: data => dispatch => {
        dispatch(loadding(true))
        api.post("/users/session", data)
            .then(response => {
                const { token } = response.data
                localStorage.setItem("token", token)
                dispatch(notification("success", "Login success!"))
                history.push("/")
            })
            .catch(err => {
                const { response } = err
                dispatch(loadding(false))
                dispatch(notification("danger", response.data.message))
            })
    },

    logout: () => dispatch => {
        dispatch(notification("warning", "logged success!"))
        localStorage.removeItem("token")
        history.push("/login")
    },

    register: data => dispatch => {
        dispatch(loadding(true))
        api.post("/users", data)
            .then(response => {
                const { token } = response.data
                localStorage.setItem("token", token)
                dispatch(notification("success", "Success created user!"))
                history.push("/")
            })
            .catch(err => {
                const { response } = err
                dispatch(loadding(false))
                dispatch(notification("danger", response.data.message))
            })
    }
}
