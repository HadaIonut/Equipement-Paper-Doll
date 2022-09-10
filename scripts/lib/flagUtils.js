import {attributeToFlagMap} from "../../constants/flagMaps.js";
import {allSlots, weaponSlotNames} from "../../constants/slotNames.js";
import {getFilterArray} from "../settings.js";
import {containsAnyOfArray} from "./itemFiltering.js";
import {flagFields, moduleName} from "../contants/constants.js";

const tattooRarityMap = {
  'common': 1,
  'uncommon': 2,
  'rare': 4,
  'veryRare': 8,
  'legendary': 16
}

const getTattooSlots = (rarity) => tattooRarityMap[rarity] ?? 1

export const extractFlags = (item) => {
  let flags = new Set()
  if (!item?.system?.properties) return []

  Object.entries(item?.system?.properties).forEach(([key, value]) => {
    if (value && attributeToFlagMap[key]) flags.add(...attributeToFlagMap[key])
  })

  return [...flags]
}

export const extractFlagsFromItemName = (item) => {
  return [...allSlots, 'tattoo'].reduce((acc,slot) => {
    const namesArray = slot === 'tattoo' ? [] : getFilterArray(slot)
    if (containsAnyOfArray(namesArray, item.name.toLowerCase())) return [...acc, `1-${slot}`]
    if (item.type === 'weapon' && weaponSlotNames.includes(slot)) return [...acc, '1-mainHand', '1-offHand']
    if (slot === 'tattoo' && (item.name.includes('tattoo') || item.name.includes('Tattoo')))
      return [...acc, `${getTattooSlots(item.system.rarity)}-tattoo`]

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