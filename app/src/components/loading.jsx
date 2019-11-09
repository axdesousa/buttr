import React from "react"
export default props => (
    <div className="loading" style={{ display: props.show === true ? "flex" : "none" }}>
        <div className="lds-dual-ring"></div>
    </div>
)
