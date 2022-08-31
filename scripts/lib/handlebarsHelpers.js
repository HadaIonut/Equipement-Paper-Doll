import {itemWithNoSlots, leftItem, rightItem} from "../contants/objectClassNames.js";

const registerHelpers = () => {
  Handlebars.registerHelper('times', function (array1, array2, item, block) {
    const n = array1[array2?.indexOf(item)];
    let accum = '';
    for (let i = 0; i < n; ++i)
      accum += block.fn(i);
    return accum;
  });

  Handlebars.registerHelper('leftOrRight', function (n) {
    return n % 2 === 0 ? leftItem : rightItem;
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

  Handlebars.registerHelper('itemHasEnoughFreeSlots', function (slotStructure, requiredSlots, flagsForSlot,index, id) {
    const flagsForCurrentItem = flagsForSlot[index];

    if (!flagsForCurrentItem) return ''

    const flagsSplit = flagsForCurrentItem.split(', ');
    const doesntFit = flagsSplit.some((flag) => {
      const [requiredSlots, slotName] = flag.split('-');
      const availableSlots = slotStructure[slotName].filter(el => el === '').length

      return requiredSlots > availableSlots
    })

    return doesntFit ? itemWithNoSlots : ''
  })

  Handlebars.registerHelper('createTooltipForLockedItem', function(hasClass, id) {
    if (!hasClass) return ''

    return `
      <div id="tooltip" role="tooltip" class="${id}"> You do not have enough slots to equip this item <span id="arrow" data-popper-arrow></div>
    `
  })

  Handlebars.registerHelper('createInventorySlots', (target) => {
    let output = '';
    for (let i = 0; i < target; i++) {
      output += `<div class="paperDollApp__inventory-slot"></div>`
    }

    return output
  })
}

export {registerHelpers}
