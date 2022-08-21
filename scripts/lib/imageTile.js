import "./popperJs/popper.min.js"
import {linkWithTooltip} from "./tooltips.js";
import {createHTMLElement} from "./headerButtonCreater.js";

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
  const newTile = createHTMLElement({
    elementName: 'div',
    attributes: {
      className: 'paperDollApp__added-item',
      'aria-describedby': 'tooltip',
      id: itemId
    },
    children: [{
      elementName: 'img',
      attributes: {
        src: item.data.img,
        className: imageClasses
      }
    }]
  })

  const toolTip = createHTMLElement({
    elementName: 'span',
    attributes: {
      id: 'tooltip',
      role: 'tooltip',
      className: itemId,
      innerText: item.data.name
    },
    children: [{
      elementName: 'span',
      attributes: {
        id: 'arrow'
      },
      customAttributes: {
        'data-popper-arrow': ''
      }
    }]
  })

  location?.parentNode?.insertBefore?.(toolTip, location);
  location?.parentNode?.replaceChild?.(newTile, location);

  linkWithTooltip(newTile, toolTip)
}

export {createImageTile}