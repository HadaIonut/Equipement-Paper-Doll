import {attributeToFlagMap} from "../../constants/flagMaps.js";
import {allSlots} from "../../constants/slotNames.js";
import {getFilterArray} from "../settings.js";
import {containsAnyOfArray} from "./itemFiltering.js";
import {flagFields, moduleName} from "../contants/constants.js";

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

export const getCurrentFlagForItem = (item, sourceSlot) => {
  const allFlags = item.getFlag(moduleName, flagFields.flags)

  return allFlags.find((flag) => flag.split(',')[0].includes(sourceSlot))
}

export const getAllIndexes = (arr, val) =>  {
  var indexes = [], i;
  for(i = 0; i < arr.length; i++)
    if (arr[i] === val)
      indexes.push(i);
  return indexes;
}