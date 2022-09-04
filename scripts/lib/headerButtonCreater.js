/**
 * Creates a button generally placed in the header of a window
 *
 * @param text {String}
 * @returns {HTMLAnchorElement}
 */
export const createHeaderButton = (text) => {
  const button = document.createElement('a')
  button.innerHTML = text
  button.classList.add('popout')
  return button
}

/**
 * Create a new HTML element with the given attributes
 *
 * @param elementName {String} - name of the element (div, span, p, etc)
 * @param attributes {Object} - object containing standard HTML attributes
 * @param customAttributes {Object} - object containing non-standard HTML attributes
 * @param events {Object} - object where key === event name; value at key === function to call on event
 * @param children {Object[]} - array containing objects that match the pattern described above, they are used to add children to this html element
 * @returns {HTMLElement}
 */
export const createHTMLElement = ({
                                    elementName,
                                    attributes = {},
                                    customAttributes = {},
                                    events = {},
                                    children = []
                                  }) => {
  const element = document.createElement(elementName)
  Object.entries(attributes).forEach(([key, value]) => {
    element[key] = value
  })
  Object.entries(customAttributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
  Object.entries(events).forEach(([eventTrigger, eventFunction]) => {
    element.addEventListener(eventTrigger, eventFunction)
  })

  children.forEach((child) => {
    const htmlChild = createHTMLElement(child)

    element.appendChild(htmlChild)
  })

  return element
}

export const insertBefore = (target, element) => {
  target?.parentNode?.insertBefore?.(element, target)
}

export const insertAfter = (target, element) => {
  target?.parentNode?.insertBefore?.(element, target.nextSibling)
}