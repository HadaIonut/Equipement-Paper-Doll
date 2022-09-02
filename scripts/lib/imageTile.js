import "./popperJs/popper.min.js"
import {linkWithTooltip} from "./tooltips.js";
import {createHTMLElement} from "./headerButtonCreater.js";
import {imageTile, tooltip} from "../components/paperDollScreen.js";
import {shadowItemModifier} from "../contants/constants.js";
import {addedImage, addedSecondaryImage} from "../contants/objectClassNames.js";

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

  const itemId = secondary ? `${item.id}${shadowItemModifier}` : item.id
  const imageClasses = secondary ? `${addedImage} ${addedSecondaryImage}` : addedImage
  const newTile = createHTMLElement(imageTile(itemId, item.img, imageClasses, item))

  const toolTip = createHTMLElement(tooltip(itemId, item.name))

  location?.parentNode?.insertBefore?.(toolTip, location);
  location?.parentNode?.replaceChild?.(newTile, location);

  linkWithTooltip(newTile, toolTip)
}

export {createImageTile}