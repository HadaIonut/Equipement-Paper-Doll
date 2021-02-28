const registerHelpers = () => {
    //TODO remove this, it is shit
    Handlebars.registerHelper('times', function(array1, array2, item, block) {
        const n = array1[array2?.indexOf(item)];
        var accum = '';
        for(var i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    });

    Handlebars.registerHelper('leftOrRight', function (n) {
        return n % 2 === 0? "leftItem" : "rightItem";
    })

    Handlebars.registerHelper('shouldBeSelected', function (itemID, position, selectedItems) {
        return new Handlebars.SafeString(itemID === selectedItems?.[position] ? "selected" : '');
    })

    Handlebars.registerHelper('startingSelection', function (position, selectedItems) {
        return new Handlebars.SafeString(selectedItems?.[position] ? '' : 'selected');
    })

    Handlebars.registerHelper('getItemPosition', function (index) {
        const positionsArray = ['75px', '55px', '50px', '35px', '35px', '25px', '35px', '25px', '50px', '35px', '75px', '55px'];
        return index % 2 === 0 ? `margin-left: ${positionsArray[index]}` : `margin-right: ${positionsArray[index]}`;
    })
}

export {registerHelpers}
