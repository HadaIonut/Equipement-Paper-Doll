import {getFilterArray} from "../settings.js";

const containsAnyOfArray = (array, target) => {
    let output = false;
    if (array.length === 1 && array[0] === '') return output;
    array.forEach((current) => {
        if (target.includes(current)) output = true;
    })
    return output;
}

const itemsContains = (itemsArray, namesArray) => {
    let itemsList = [];
    itemsArray.forEach((item) => {
        if (containsAnyOfArray(namesArray, item.data.name.toLowerCase())) itemsList.push(item);
    })
    return itemsList;
}

const filterEquipableItems = (actorItems) => {
    const equipableTypes = ['backpack', 'equipment', 'weapon', 'loot'];
    return actorItems.filter((item) => equipableTypes.includes(item.type));
}

const findWeapons = (items) => {
    return items.filter((item) => item.type === 'weapon').concat(itemsContains(items, getFilterArray('mainHand')))
}

const findOffHand = (items) => {
    const weapons = items.filter((item) => item.type === 'weapon');
    const secondary = itemsContains(items, getFilterArray('offHand'));
    return weapons.concat(secondary);
}

const filterActorItems = (actorItems) => {
    const itemTypesObject = {};
    const equipableItems = filterEquipableItems(actorItems);
    itemTypesObject['head'] = itemsContains(equipableItems, getFilterArray('head'));
    itemTypesObject['eyes'] = itemsContains(equipableItems, getFilterArray('eyes'));
    itemTypesObject['neck'] = itemsContains(equipableItems, getFilterArray('neck'));
    itemTypesObject['cape'] = itemsContains(equipableItems, getFilterArray('cape'));
    itemTypesObject['torso'] = itemsContains(equipableItems, getFilterArray('torso'));
    itemTypesObject['waist'] = itemsContains(equipableItems, getFilterArray('waist'));
    itemTypesObject['wrists'] = itemsContains(equipableItems, getFilterArray('wrists'));
    itemTypesObject['hands'] = itemsContains(equipableItems, getFilterArray('hands'));
    itemTypesObject['feet'] = itemsContains(equipableItems, getFilterArray('feet'));
    itemTypesObject['ring'] = itemsContains(equipableItems, getFilterArray('ring'));
    itemTypesObject['mainHand'] = findWeapons(equipableItems);
    itemTypesObject['offHand'] = findOffHand(equipableItems);

    return itemTypesObject;
}

export {filterActorItems, filterEquipableItems};