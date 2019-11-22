import api from "../../utils/api"
import { loadding, notification } from "./app"
export const Types = {
    FECTH: "tool/fecth",
    TYPING: "tool/typing",
    SAVE: "tool/save"
}

const INITIAL_STATE = {
    inTag: false,
    search: "",
    data: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.FECTH:
            return {
                ...state,
                data: action.payload.data,
                search: action.payload.search,
                inTag: action.payload.inTag
            }

        case Types.TYPING:
            return { ...state, search: action.search }
        default:
            return state
    }
}

export const Creators = {
    fetch: () => dispatch => {
        dispatch(loadding(true))

        api.get("/tools")
            .then(response => {
                dispatch({
                    type: Types.FECTH,
                    payload: { data: response.data, search: "", inTag: false }
                })
                dispatch(loadding(false))
            })
            .catch(err => {
                console.log(err)
            })
    },

    search: (term, inTag) => dispatch => {
        dispatch({
            type: Types.TYPING,
            search: term
        })
        const params = inTag === true ? `?search=${term}&is_tag=true` : `?search=${term}`
        api.get(`/tools${params}`).then(response => {
            dispatch({
                type: Types.FECTH,
                payload: { data: response.data || [], search: term, inTag }
            })
        })
    },
    save: data => async dispatch => {
        dispatch(loadding(true))

        if (data.id) {
            await api.put(`/tools/${data.id}`, data)
        } else {
            await api.post("/tools/", data)
        }
        api.get("/tools").then(response => {
            dispatch({
                type: Types.FECTH,
                payload: { data: response.data, search: "", inTag: false }
            })
            dispatch(loadding(false))
            dispatch(notification("success", "Saved successfully"))
        })
    },
    destroy: id => async dispatch => {
        dispatch(loadding(true))
        api.delete(`/tools/${id}`).then(response => {
            api.get("/tools").then(response => {
                dispatch({
                    type: Types.FECTH,
                    payload: { data: response.data, search: "", inTag: false }
                })
                dispatch(loadding(false))
                dispatch(notification("success", "Success deleted tool"))
            })
        })
    }
}
