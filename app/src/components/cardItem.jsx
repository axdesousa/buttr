import React from "react"
import { connect } from "react-redux"
import { IoIosClose, IoMdCreate } from "react-icons/io"
import { markTag, markTool } from "../utils/markLetter"

const CardItem = props => (
    <div className="card card-item">
        <div className="card-content">
            <div className="content">
                <div className="item-header">
                    <h4>{markTool(props.tool, props.title)}</h4>
                    <div>
                        <button
                            onClick={() => props.edit()}
                            className="button is-link is-light is-small"
                        >
                            <IoMdCreate />
                            Edit
                        </button>
                        <button
                            onClick={() => props.apaga()}
                            className="button is-danger is-light is-small"
                        >
                            <IoIosClose />
                            remove
                        </button>
                    </div>
                </div>
                <div className="clear10"></div>
                {props.description}
                <div className="tags">
                    {props.tags.map((tag, i) => (
                        <span key={`tag_${i}`} className={`tag is-light is-link`}>
                            {markTag(props.tool, tag.name)}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
)

const mapStateToProps = state => ({ tool: state.tool })

export default connect(mapStateToProps)(CardItem)
