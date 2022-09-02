import {attributeToFlagMap} from "../../constants/flagMaps.js";
import {allSlots} from "../../constants/slotNames.js";
import {getFilterArray} from "../settings.js";
import {containsAnyOfArray} from "./itemFiltering.js";

export const extractFlags = (item) => {
  let flags = new Set()
  if (!item?.system?.properties) return []

  Object.entries(item?.system?.properties).forEach(([key, value]) => {
    if (value && attributeToFlagMap[key]) flags.add(...attributeToFlagMap[key])
  })

  return [...flags]
}

export const extractFlagsFromItemName = (item) => {
  return allSlots.reduce((acc,slot) => {
    const namesArray = getFilterArray(slot)
    if (containsAnyOfArray(namesArray, item.name.toLowerCase()))
      return [...acc, `1-${slot}`]

    return [...acc]
  }, [])

}