import "./popperJs/popper.min.js"
import {linkWithTooltip} from "./tooltips.js";

/**
 * Creates an image tile a given location.
 * This image tile has a tooltip made py popperJs
 *
 * @param item - item equipped
 * @param location
 */
const createImageTile = (item, location) => {
    if (!item) return;
    const newTile = $(`<div id='${item.data._id}' class="paperDollApp__added-item" aria-describedby="tooltip"><img src="${item.data.img}" style="height: 45px; width: 47px;"></div>`);
    const toolTip = $(`<span id="tooltip" role="tooltip" class='${item.data._id}'> ${item.data.name} <span id="arrow" data-popper-arrow></span> </span>`);

    location?.parentNode?.insertBefore?.(toolTip[0], location);
    location?.parentNode?.replaceChild?.(newTile[0], location);

    linkWithTooltip(newTile[0], toolTip[0])
}

export {createImageTile}