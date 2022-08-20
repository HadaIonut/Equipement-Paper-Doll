import {filterActorItems, filterEquipableItems} from "../lib/itemFiltering.js"
import {registerHelpers} from "../lib/handlebarsHelpers.js";
import {getItemsSlotArray} from "../settings.js";
import {createImageTile} from "../lib/imageTile.js";
import personalSettingsApp from "./personalSettingsApp.js";
import {slotNames} from "../../constants/slotNames.js";
import {extractFlags} from "../lib/flagsExtracter.js";
import itemSearchApp from "./itemSearchApp.js";
import {createHeaderButton, insertBefore} from "../lib/headerButtonCreater.js";

const getBackgroundImageFromActorFlags = (sourceActor) => {
  return sourceActor.getFlag("Equipment-Paper-Doll", "personalSettings")?.filter(obj => obj.name === 'image')?.[0]?.value;
}

export default class PaperDollApp extends FormApplication {
  constructor(sourceActor) {
    super();
    this.sourceActor = sourceActor;
    this.items = isNewerVersion(game.data.version, "0.7.0") ? sourceActor.items : sourceActor.items.entries;
    this.selectedItems = this.sourceActor.getFlag("Equipment-Paper-Doll", "data");
    this.equipableItems = filterEquipableItems(this.items);
    this.filteredItems = filterActorItems(this.items);

    this.flagEquippedItems()
    this.getSlotsStructure()
  }

  flagEquippedItems() {
    [...this.items].forEach((item) => {
        if (Array.isArray(item.getFlag('Equipment-Paper-Doll', 'flags'))) return

        item.setFlag('Equipment-Paper-Doll', 'flags', extractFlags(item))
      }
    )
  }

  static get defaultOptions() {
    registerHelpers()
    return {
      ...super.defaultOptions,
      id: "paper-doll",
      template: "modules/Equipment-Paper-Doll/templates/paperDollApp.hbs",
      resizable: false,
      minimizable: true,
      title: "Paper Doll Viewer",
      submitOnClose: true,
      closeOnSubmit: false
    }
  }

  getData(options) {
    const itemSlotNames = slotNames;
    const weaponSlotNames = ['mainHand', 'offHand'];
    return {
      selectedItems: this.selectedItems,
      itemTypes: {
        types: itemSlotNames,
        slots: getItemsSlotArray(itemSlotNames, this.sourceActor)
      },
      items: {...this.filteredItems},
      weaponsTypes: {
        types: weaponSlotNames,
        slots: getItemsSlotArray(weaponSlotNames, this.sourceActor)
      },
    }
  }

  getSlotsStructure() {
    const weaponSlotNames = ['mainHand', 'offHand'];
    const itemSlotsArray = getItemsSlotArray(slotNames, this.sourceActor)
    const weaponSlotsArray = getItemsSlotArray(weaponSlotNames, this.sourceActor)
    this.slotStructure = this.selectedItems
    slotNames.forEach((slot, index) =>  {
      this.slotStructure[slot].splice(1, this.slotStructure[slot].length - itemSlotsArray[index])
    })
    weaponSlotNames.forEach((slot, index) =>  {
      this.slotStructure[slot].splice(1, this.slotStructure[slot].length - weaponSlotsArray[index])
    })
  }

  /**
   * Extracts the ids of the equipped items
   *
   * @returns { Array<object> }
   * @exampleObject {head: [ids of all equipped items]}
   */
  extractDataFromForm() {
    const divStructureArray = [...document.querySelectorAll('.paperDollApp__background-image > *'),
      ...document.querySelectorAll('.paperDollApp__secondary-items > *')];
    const formData = {};
    divStructureArray.forEach((element) => {
      const dataPoints = [...element.lastElementChild.children];
      const fieldData = [];

      dataPoints.forEach(point => {
        if (point.id !== 'tooltip') fieldData.push(point.id)
      });
      formData[element.id] = fieldData;
    })

    return formData;
  }

  /**
   * On loading the app replaces the button tiles with the imageTiles of items that are saved
   *
   * @param html - app html
   * @param storedItems - object that contains lists of what items ids are on each slot
   * @param actorItems - all items from the actor
   */
  replaceWithStoredItems(html, storedItems, actorItems) {
    if (!storedItems) return;

    Object.keys(storedItems).forEach((itemType) => {
      const slotsArray = html.querySelectorAll(`#${itemType} > .paperDollApp__item-slots-grid > button`);
      storedItems[itemType].forEach((itemSlot, index) => {
        if (itemSlot === '') return;

        const item = actorItems.filter(localItem => localItem.data._id === itemSlot)[0];
        createImageTile(item, slotsArray[index])
      })
    })
  }

  /**
   * Method called on submit, saves the stored items as a flag on the actor
   *
   * @param event - submit event
   * @param formData - form data returned by the submit event, it get overwritten, idk why I need it
   * @private
   */
  async _updateObject(event, formData) {
    formData = this.extractDataFromForm();

    await this.sourceActor.setFlag("Equipment-Paper-Doll", "data", formData)
  }

  /**
   * Renders the search window
   *
   * @param source - event that caused the render
   * @param selectedItems - items that match the slot filter
   * @param allItems - all equipable items
   */
  renderSearchWindow(source, selectedItems, allItems) {
    const location = source.currentTarget.parentNode.parentNode;
    const availableSlots = this.slotStructure[location.id].filter((el) => el === '').length
    new itemSearchApp(selectedItems[location.id], allItems, source, availableSlots, location.id).render(true);
  }

  /**
   * Replaces a image tile with an empty slot
   *
   * @param item - item to be removed
   */
  unEquipItem(item) {
    const addBox = $('<button type="submit" class="paperDollApp__add-box"></button>');
    addBox.on('click', (source) => {
      this.renderSearchWindow(source, this.filteredItems, this.equipableItems)
    });
    item.parent().children().each((index, element) => {
      if (element.nodeName === 'SPAN' && element.id === 'tooltip' && element.className === `${item[0].id}`) element.remove();
    })
    item.replaceWith(addBox);
    document.querySelector('.hidden-submit').click()
  }

  /**
   * Creates a context menu in a given app
   *
   * @param html - app
   */
  createNewContextMenu(html) {
    new ContextMenu(html, '.paperDollApp__added-item', [{
      name: 'Unequip item',
      icon: '<i class="fas fa-trash fa-fw"></i>',
      condition: () => true,
      callback: this.unEquipItem.bind(this)
    }])
  }

  setBackgroundImage(html) {
    const backgroundContainer = html.querySelector('.paperDollApp__background-image');
    const path = getBackgroundImageFromActorFlags(this.sourceActor);
    if (!path) return;
    backgroundContainer.style.background = `url(./${path}) no-repeat center`
    backgroundContainer.style['background-size'] = 'contain'
  }

  /**
   * Adds the button that opens the personal settings screen
   * Only creates the button if the user is a GM
   *
   * @param html - app
   */
  openPersonalSettings(html) {
    if (!game.user.isGM) return;

    const lastButton = html.parentNode.parentNode.firstElementChild.lastElementChild;
    const openSettingsButton = createHeaderButton('Open Settings')
    openSettingsButton.addEventListener('click', () => {
      new personalSettingsApp(this.sourceActor, this.filteredItems, this.equipableItems).render(true);
    })
    insertBefore(lastButton, openSettingsButton);
  }

  activateListeners(html) {
    this.setBackgroundImage(html[0]);
    const addBoxes = html[0].querySelectorAll('.paperDollApp__add-box');
    addBoxes.forEach((box) => box.addEventListener('click', (source) => {
      this.renderSearchWindow(source, this.filteredItems, this.equipableItems)
    }))

    this.replaceWithStoredItems(html[0], this.selectedItems, this.items)
    this.openPersonalSettings(html[0]);
    this.createNewContextMenu(html);
    super.activateListeners(html);
  }
}