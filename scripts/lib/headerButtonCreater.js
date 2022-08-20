export const createHeaderButton = (text) => {
  const button = document.createElement('a')
  button.innerHTML = text
  button.classList.add('popout')
  return button
}

export const insertBefore = (target, element) => {
  target?.parentNode?.insertBefore?.(element, target)
}

export const insertAfter = (target, element) => {
  target?.parentNode?.insertBefore?.(element, target.nextSibling)
}