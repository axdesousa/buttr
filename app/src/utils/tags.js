export const tagsToString = tags => {
    const data = []
    tags.forEach(element => {
        data.push(element.name)
    })
    return data.join(" ")
}

export const stringToTags = tags => {
    let data = []
    tags.split(" ").forEach(element => {
        data.push(element)
    })
    return data
}
