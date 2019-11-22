import React, { useState, useEffect } from "react"
import { IoIosAdd } from "react-icons/io"
import { tagsToString, stringToTags } from "../utils/tags"

const initialState = {
    title: "",
    link: "",
    description: "",
    tags: ""
}

export default props => {
    const [tool, setTool] = useState(props.tool || initialState)

    useEffect(() => {
        if (props.state.modalTool === false) {
            setTool(initialState)
        } else {
            if (props.state.tool !== null) {
                const tags = tagsToString(props.state.tool.tags)
                setTool({ ...props.state.tool, tags })
            } else {
                setTool(initialState)
            }
        }
    }, [props.state.modalTool, props.state.tool])

    const upField = (field, value) => {
        setTool({ ...tool, [field]: value })
    }

    const submit = () => {
        const tags = stringToTags(tool.tags)

        const data = { ...tool, tags }

        props.save(data)
        props.close()
    }

    return (
        <div
            className="modal"
            style={{ display: props.state.modalTool === true ? "block" : "none" }}
        >
            <div className="modal-background"></div>
            <button
                className="modal-close is-large"
                onClick={() => props.close()}
                aria-label="close"
            ></button>
            <div className="modal-content">
                <div className="modal-heading">
                    <span>
                        <IoIosAdd size={25} />
                    </span>
                    <h3>{tool.id ? "Edit" : "Add"} Tool</h3>
                </div>
                <div className="modal-body">
                    <div className="field">
                        <label className="label">Tool Title</label>
                        <div className="control">
                            <input
                                onChange={e => upField("title", e.target.value)}
                                className="input"
                                value={tool.title}
                                type="text"
                                placeholder="Title..."
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Tool Link</label>
                        <div className="control">
                            <input
                                className="input"
                                value={tool.link}
                                onChange={e => upField("link", e.target.value)}
                                type="text"
                                placeholder="http://link"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Tool Description</label>
                        <div className="control">
                            <textarea
                                onChange={e => upField("description", e.target.value)}
                                className="textarea"
                                placeholder="Description..."
                                value={tool.description}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Tags</label>
                        <div className="control">
                            <input
                                className="input"
                                onChange={e => upField("tags", e.target.value)}
                                value={tool.tags}
                                type="text"
                                placeholder="#one #two #three"
                            />
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button onClick={() => submit()} className="button is-link">
                                Submit
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
