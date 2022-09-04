import {getFilterArray} from "../settings.js";

export const containsAnyOfArray = (array, target) => {
  let output = false;
  if (array.length === 1 && array[0] === '') return output;
  array.forEach((current) => {
    if (target.includes(current) || current.includes(target)) output = true;
  })
  return output;
}

const itemContainsRelatedFlags = (itemsArray, slotName) => {
  return itemsArray.reduce((acc, cur) => {
    const flags = cur.getFlag('Equipment-Paper-Doll', 'flags')
    if (flags && containsAnyOfArray(flags, slotName))
      return [...acc, cur]
    return [...acc]
  }, [])
}

const itemsContains = (itemsArray, namesArray, slotName) => {
  return itemContainsRelatedFlags(itemsArray, slotName)
}

/**
 * Returns a list of items that can be equipped
 *
 * @param actorItems
 * @returns {*}
 */
const filterEquipableItems = (actorItems) => {
  const equipableTypes = ['backpack', 'equipment', 'weapon', 'loot', 'consumable', 'tool'];
  return actorItems.filter((item) => equipableTypes.includes(item.type));
}

/**
 * Returns weapons and items that match the filter
 *
 * @param items - all items
 * @param filters
 * @returns {*}
 */
const findWeaponsAndFilter = (items, filters) => {
  return items.filter((item) => item.type === 'weapon')
}

/**
 * Returns the items that can be equipped on offhand
 *
 * @param items
 * @returns {*}
 */
const findOffHand = (items) => {
  const weapons = items.filter((item) => item.type === 'weapon');
  const secondary = itemsContains(items, getFilterArray('offHand'), 'hands');
  return weapons.concat(secondary);
}

/**
 * Returns an object with the items that can be equipped on each body part
 *
 * @param actorItems - all actor items
 * @returns {{}}
 */
const filterActorItems = (actorItems) => {
  const itemTypesObject = {};
  const equipableItems = filterEquipableItems(actorItems);
  itemTypesObject['head'] = itemsContains(equipableItems, getFilterArray('head'), 'head');
  itemTypesObject['eyes'] = itemsContains(equipableItems, getFilterArray('eyes'), 'eyes');
  itemTypesObject['neck'] = itemsContains(equipableItems, getFilterArray('neck'), 'neck');
  itemTypesObject['cape'] = itemsContains(equipableItems, getFilterArray('cape'), 'cape');
  itemTypesObject['torso'] = itemsContains(equipableItems, getFilterArray('torso'), 'torso');
  itemTypesObject['waist'] = itemsContains(equipableItems, getFilterArray('waist'), 'waist');
  itemTypesObject['wrists'] = itemsContains(equipableItems, getFilterArray('wrists'), 'wrists');
  itemTypesObject['hands'] = itemsContains(equipableItems, getFilterArray('hands'), 'hands');
  itemTypesObject['feet'] = itemsContains(equipableItems, getFilterArray('feet'), 'feet');
  itemTypesObject['ring'] = itemsContains(equipableItems, getFilterArray('ring'), 'ring');
  itemTypesObject['back'] = findWeaponsAndFilter(equipableItems, getFilterArray('back'))
  itemTypesObject['mainHand'] = findWeaponsAndFilter(equipableItems, getFilterArray('mainHand'));
  itemTypesObject['offHand'] = findOffHand(equipableItems);

  return itemTypesObject;
}

export {filterActorItems, filterEquipableItems};