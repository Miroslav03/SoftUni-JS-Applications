export function createElement(type, textContent, parent, attributes) {
    const element = document.createElement(type);
    element.textContent = textContent;
    if (parent){
        parent.appendChild(element)
    }

    for (const attribute of Object.keys(attributes)) {
        element.setAttribute(attribute,attributes[attribute])
    }
    return element
}

