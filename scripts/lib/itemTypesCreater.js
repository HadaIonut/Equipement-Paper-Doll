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

const itemTypes = (actorItems) => {
    const itemTypesObject = {};
    const equipableItems = filterEquipableItems(actorItems);
    itemTypesObject['head'] = itemsContains(equipableItems,["helmet", "circlet", "headband", "helm", "crown"]);
}

export {itemTypes};