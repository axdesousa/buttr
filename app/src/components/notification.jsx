import React, { useEffect } from "react"
import { notification } from "../store/ducks/app"
export default props => {
    const { message, dispatch } = props
    useEffect(() => {
        if (message.open === true) {
            setTimeout(() => {
                dispatch(notification("close"))
            }, 5000)
        }
    }, [message.open, dispatch])
    return (
        <div className="notificacao" style={{ right: message.open === true ? 10 : -400 }}>
            <article className="message is-success ">
                <div className="message-body">{message.text}</div>
            </article>
        </div>
    )
}
