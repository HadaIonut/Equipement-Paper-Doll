export const createHeaderButton = (text) => {
  const button = document.createElement('a')
  button.innerHTML = text
  button.classList.add('popout')
  return button
}

export const createHTMLElement = ({
                                    elementName,
                                    attributes = {},
                                    customAttributes = {},
                                    events = {}
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

  return element
}

export const insertBefore = (target, element) => {
  target?.parentNode?.insertBefore?.(element, target)
}

export const insertAfter = (target, element) => {
  target?.parentNode?.insertBefore?.(element, target.nextSibling)
}