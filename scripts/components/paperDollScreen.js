import {
  addBoxClass,
  addedItemClass,
  fillerElementClass, inventoryEquippedClass, inventoryEquippedWrapperClass,
  inventoryImageClass,
  inventoryItemClass, inventorySlot, inventorySlotRightSide
} from "../contants/objectClassNames.js";
import {shadowItemModifier} from "../contants/constants.js";

export const paperDollWindowData = {
  id: 'paper-doll',
  title: 'Paper Doll Viewer',
  resizable: false,
  minimizable: true,
  submitOnClose: true,
  closeOnSubmit: false
}

export const addBoxComponent = {
  elementName: 'button',
  attributes: {
    type: 'submit',
    className: addBoxClass
  },
}

export const rightClickMenuComponent = {
  name: 'Unequip item',
  icon: '<i class="fas fa-trash fa-fw"></i>',
  condition: (item) => !item[0].id.includes(shadowItemModifier),
}

export const inventoryRemoveComponent = {
  name: 'Remove',
  icon: '<i class="fas fa-trash fa-fw"></i>',
  condition: true,
}

export const unequipFromInventoryComponent = {
  name: 'Unequip',
  icon: '<i class="fas fa-shield-alt"></i>',
  condition: (item) => item[0].classList.contains(inventoryEquippedWrapperClass),
}

export const fillerElementComponent = {
  elementName: 'div',
  attributes: {
    className: fillerElementClass
  }
}

export const imageTile = (itemId, image, imageClasses, item) => ({
  elementName: 'div',
  attributes: {
    className: addedItemClass,
    'aria-describedby': 'tooltip',
    id: itemId
  },
  events: {
    click: () => item.sheet.render(true)
  },
  children: [{
    elementName: 'img',
    attributes: {
      src: image,
      className: imageClasses
    }
  }]
})

export const tooltip = (itemId, itemName) => ({
  elementName: 'span',
  attributes: {
    id: 'popperTooltip',
    role: 'tooltip',
    className: itemId,
    innerText: itemName
  },
  children: [{
    elementName: 'span',
    attributes: {
      id: 'arrow'
    },
    customAttributes: {
      'data-popper-arrow': ''
    }
  }]
})

export const inventoryItem = (itemId, image, equipped ,item, reverted) => ({
  elementName: 'div',
  attributes: {
    className: `${inventoryItemClass} ${equipped ? inventoryEquippedWrapperClass : ''} ${reverted ? inventorySlotRightSide : ''}`,
    'aria-describedby': 'tooltip',
    id: itemId
  },
  events: {
    click: () => item.sheet.render(true)
  },
  children: [{
    elementName: 'img',
    attributes: {
      src: image,
      className: `${inventoryImageClass} ${equipped ? inventoryEquippedClass : ''}`
    }
  }]
})

export const emptyInventorySlot = {
  elementName: 'div',
  attributes: {
    className: inventorySlot
  }
}