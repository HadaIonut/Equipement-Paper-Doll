import {addBoxClass, addedItemClass, fillerElementClass} from "../contants/objectClassNames.js";
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

export const fillerElementComponent = {
  elementName: 'div',
  attributes: {
    className: fillerElementClass
  }
}

export const imageTile = (itemId, image, imageClasses) => ({
  elementName: 'div',
  attributes: {
    className: addedItemClass,
    'aria-describedby': 'tooltip',
    id: itemId
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
    id: 'tooltip',
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