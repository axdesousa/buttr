export const Types = {
    LOADING: "app/loading",
    MESSAGE: "app/message"
}

const INITIAL_STATE = {
    loading: false,
    message: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.LOADING:
            return { ...state, loading: action.loading }

        case Types.MESSAGE:
            return { ...state, message: action.message }

        default:
            return state
    }
}

export const loadding = open => {
    return {
        type: Types.LOADING,
        loading: open
    }
}

export const notification = (type, text = "") => {
    return {
        type: Types.MESSAGE,
        message: {
            type: type !== "close" ? type : "",
            open: type !== "close" ? true : false,
            text
        }
    }
}
