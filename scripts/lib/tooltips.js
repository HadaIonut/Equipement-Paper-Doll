const hide = (toolTip) => {
  toolTip.removeAttribute('data-show');
}

const show = (popperInstance, toolTip) => {
  toolTip.setAttribute('data-show', '');

  popperInstance.update();
}

const createEvents = (item, popperInstance, toolTip) => {
  const showEvents = ['mouseenter', 'focus'];
  const hideEvents = ['mouseleave', 'blur'];

  showEvents.forEach(event => {
    item.addEventListener(event, () => show(popperInstance, toolTip));
  });

  hideEvents.forEach(event => {
    item.addEventListener(event, () => hide(toolTip));
  });
}

export const linkWithTooltip = (item, tooltip) => {
  let popperInstance = Popper.createPopper(item, tooltip, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  })

  createEvents(item, popperInstance, tooltip);
}