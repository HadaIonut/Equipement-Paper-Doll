const registerHelpers = () => {
    Handlebars.registerHelper('times', function (array1, array2, item, block) {
        const n = array1[array2?.indexOf(item)];
        let accum = '';
        for (let i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    });

    Handlebars.registerHelper('leftOrRight', function (n) {
        return n % 2 === 0 ? "paperDollApp__left-item" : "paperDollApp__right-item";
    })

    Handlebars.registerHelper('createFillerElements', function (createdItems, itemNames, currentItem, block) {
        const n = (currentItem === 'ring' ? 8 : 4) - createdItems[itemNames?.indexOf(currentItem)];
        let accum = '';
        for (let i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    })

    Handlebars.registerHelper('prettifyTextToDisplay', function (text) {
        const splitText = text.split(/(?=[A-Z])/);
        let outText = '';
        splitText.forEach((word) => {
             const lowerString = word.toLowerCase();
             outText += lowerString.charAt(0).toUpperCase() + lowerString.slice(1) + ' ';
        })
        outText.trimEnd();

        return outText;
    })

    Handlebars.registerHelper('getValueAtIndex', function (array, index) {
        return array?.[index]
    })

    Handlebars.registerHelper('itemHasEnoughFreeSlots', function (availableSlots, array, index) {
        return array?.[index] <= availableSlots ? '' : 'no-slots'
    })
}

export {registerHelpers}
