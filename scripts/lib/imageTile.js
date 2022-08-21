import "./popperJs/popper.min.js"
import {linkWithTooltip} from "./tooltips.js";

/**
 * Creates an image tile a given location.
 * This image tile has a tooltip made py popperJs
 *
 * @param item - item equipped
 * @param location
 * @param secondary
 */
const createImageTile = (item, location, secondary = false) => {
    if (!item) return;
    const itemId = secondary ? `${item.data._id}__secondary` : item.data._id
    const imageClasses = secondary ? 'paperDollApp__image-tile paperDollApp__secondary-image' : 'paperDollApp__image-tile'
    const newTile = $(`<div id='${itemId}' class="paperDollApp__added-item" aria-describedby="tooltip"><img src="${item.data.img}" class="${imageClasses}"></div>`);
    const toolTip = $(`<span id="tooltip" role="tooltip" class='${itemId}'> ${item.data.name} <span id="arrow" data-popper-arrow></span> </span>`);

    location?.parentNode?.insertBefore?.(toolTip[0], location);
    location?.parentNode?.replaceChild?.(newTile[0], location);

    linkWithTooltip(newTile[0], toolTip[0])
}

export {createImageTile}