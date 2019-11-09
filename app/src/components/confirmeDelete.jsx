import React, { useEffect } from "react"
import { IoIosClose } from "react-icons/io"

export default props => {
    useEffect(() => {
        console.log("show", props.show)
    }, [props.show])
    return (
        <div className="modal" style={{ display: props.show === true ? "block" : "none" }}>
            <div className="modal-background"></div>
            <button
                className="modal-close is-large"
                onClick={() => props.close()}
                aria-label="close"
            ></button>
            <div className="modal-content">
                <div className="modal-heading">
                    <span>
                        <IoIosClose size={25} />
                    </span>
                    <h3>Delete Tool</h3>
                </div>
                <div className="modal-body">
                    <div>
                        <article className="message is-warning ">
                            Do you want to delete this tool&nbsp;
                            <i>{props.tool && props.tool.title}</i>
                        </article>
                    </div>
                    <div className="clear10" />
                    <div className="field is-grouped">
                        <div className="control">
                            <button onClick={() => props.destroy()} className="button is-danger ">
                                Delete
                            </button>
                        </div>
                        <div className="control">
                            <button
                                className="button is-link is-light"
                                onClick={() => props.close()}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
