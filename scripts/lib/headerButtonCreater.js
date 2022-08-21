export const createHeaderButton = (text) => {
  const button = document.createElement('a')
  button.innerHTML = text
  button.classList.add('popout')
  return button
}

export const createHTMLButton = ({type, className, id, eventListener, eventTrigger}) => {
  const button = document.createElement('button')
  if (type) button.type = type
  if (className) button.className = className
  if (id) button.id = id
  if (eventListener && eventTrigger) button.addEventListener(eventTrigger, eventListener)

  return button
}

export const insertBefore = (target, element) => {
  target?.parentNode?.insertBefore?.(element, target)
}

export const insertAfter = (target, element) => {
  target?.parentNode?.insertBefore?.(element, target.nextSibling)
}