const registerHelpers = () => {
    Handlebars.registerHelper('times', function(array1, array2, item, block) {
        const n = array1[array2?.indexOf(item)];
        let accum = '';
        for(let i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    });

    Handlebars.registerHelper('leftOrRight', function (n) {
        return n % 2 === 0? "leftItem" : "rightItem";
    })

    Handlebars.registerHelper('createFillerElements', function (createdItems, itemNames, currentItem, block) {
        const n = (currentItem === 'ring' ?  8 : 4) - createdItems[itemNames?.indexOf(currentItem)];
        let accum = '';
        for(let i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    })
}

export {registerHelpers}
