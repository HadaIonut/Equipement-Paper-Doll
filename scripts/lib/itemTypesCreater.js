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
        if (containsAnyOfArray(namesArray, item.data.name.toLowerCase())) itemsList.push(item.data.name);
    })
    return itemsList;
}

const itemTypes = (actorItems) => {
    const itemTypesObject = {};
    itemTypesObject['head'] = itemsContains(actorItems,["helmet", "circlet", "headband", "helm"]);
}

export {itemTypes};