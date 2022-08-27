export const primaryItems = '.paperDollApp__background-image > *'
export const secondaryItems = '.paperDollApp__secondary-items > *'
export const availableSlots = (itemType) => `#${itemType} > .paperDollApp__item-slots-grid > button`
export const everythingInGrid = (itemType) => `#${itemType} > .paperDollApp__item-slots-grid > *`
export const slotsContainer = (itemType) => `#${itemType} > .paperDollApp__item-slots-grid`
export const allEquippedItems = '.paperDollApp__item-slots-grid > .paperDollApp__added-item'
export const nonFillerElements = '.paperDollApp__added-item, button'
export const imageUrlInputField = 'input[name="imgUrl"]'
export const imagePathInputField = 'input.imagePath'