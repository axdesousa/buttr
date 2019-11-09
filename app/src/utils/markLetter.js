import React from "react"
export const markTag = (props, tag) => {
    const check = tag.toLowerCase().indexOf(props.search.toLowerCase())
    if (props.inTag && check !== -1 && props.search.length > 0) {
        const tagMark = tag.substr(check, props.search.length)
        return (
            <>
                {tag.substr(0, check)}
                <i>{tagMark}</i>
                {tag.substr(check + props.search.length)}
            </>
        )
    } else {
        return tag.toLowerCase()
    }
}

export const markTool = (props, tool) => {
    const check = tool.toLowerCase().indexOf(props.search.toLowerCase())
    if (props.inTag === false && check !== -1 && props.search.length > 0) {
        const toolMark = tool.substr(check, props.search.length)
        return (
            <>
                {tool.substr(0, check)}
                <i>{toolMark}</i>
                {tool.substr(check + props.search.length)}
            </>
        )
    } else {
        return tool.toLowerCase()
    }
}
