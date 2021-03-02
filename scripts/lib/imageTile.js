const hide = (toolTip) => {
    toolTip.removeAttribute('data-show');
}

const show = (popperInstance, toolTip) => {
    toolTip.setAttribute('data-show', '');

    popperInstance.update();
}

const createEvents = (newTile, popperInstance, toolTip) => {
    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];

    showEvents.forEach(event => {
        newTile.addEventListener(event, () => show(popperInstance, toolTip));
    });

    hideEvents.forEach(event => {
        newTile.addEventListener(event, () => hide(toolTip));
    });
}

const createImageTile = (item, location) => {
    if (!item) return;
    const newTile = $(`<div id='${item.data._id}' class="addedItem" aria-describedby="tooltip"><img src="${item.data.img}" ></div>`);
    const toolTip = $(`<span id="tooltip" role="tooltip" class='${item.data._id}'> ${item.data.name} <span id="arrow" data-popper-arrow></span> </span>`);

    location.after(toolTip[0]);
    location.replaceWith(newTile[0]);

    const popperInstance = Popper.createPopper(newTile[0], toolTip[0], {
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

    createEvents(newTile[0], popperInstance, toolTip[0]);
}

export {createImageTile}