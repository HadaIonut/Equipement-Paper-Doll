const containsAnyOfArray = (array, target) => {
    let output = false;
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

const filterActorItems = (actorItems) => {
    const itemTypesObject = {};
    const equipableItems = filterEquipableItems(actorItems);
    itemTypesObject['head'] = itemsContains(equipableItems,['helmet', 'circlet', 'headband', 'helm', 'crown', 'hat']);
    itemTypesObject['eyes'] = itemsContains(equipableItems,['goggle', 'eye']);
    itemTypesObject['neck'] = itemsContains(equipableItems,['amulet', 'necklace', 'periapt']);
    itemTypesObject['cape'] = itemsContains(equipableItems,['cape', 'backpack', 'haversack', 'mantle', 'robe', 'cloak']);
    itemTypesObject['torso'] = itemsContains(equipableItems,['breastplate', 'armor', 'mail', 'chain', 'plate', 'clothes', 'shirt']);
    itemTypesObject['waist'] = itemsContains(equipableItems,['belt']);
    itemTypesObject['wrists'] = itemsContains(equipableItems,['shackle', 'manacles', 'bracers']);
    itemTypesObject['hands'] = itemsContains(equipableItems,['gloves']);
    itemTypesObject['feet'] = itemsContains(equipableItems,['boot']);
    itemTypesObject['ring'] = itemsContains(equipableItems,['ring']);

    return itemTypesObject;
}

export {filterActorItems};