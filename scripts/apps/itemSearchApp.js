import {createImageTile} from "../lib/imageTile.js";
import "../lib/popperJs/popper.min.js"
import {linkWithTooltip} from "../lib/tooltips.js";
import {weaponSlotNames} from "../../constants/slotNames.js";
import {itemSearchAppData} from "../components/itemSearchApp.js";
import {flagFields, itemEquippedPath, moduleName, shadowItemModifier} from "../contants/constants.js";
import {allEquippedItems, availableSlots} from "../contants/commonQuerries.js";
import {
  addBoxClass,
  internalGrid,
  itemNotInFilter,
  itemWithNoSlots,
  searchBarClass
} from "../contants/objectClassNames.js";
import {getAllIndexes, getCurrentFlagForItem} from "../lib/flagUtils.js";

export default class itemSearchApp extends FormApplication {
  constructor(filteredItems, allItems, source, slotStructure, categoryName) {
    super()
    this.filteredItems = filteredItems
    this.allItems = allItems
    this.source = source
    this.slotStructure = slotStructure
    this.categoryName = categoryName
    this.flagsForSlot = []
  }

  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      ...itemSearchAppData,
      template: "modules/Equipment-Paper-Doll/templates/itemSearchApp.hbs",
    }
  }

  /**
   * Returns an array of how many slots are required for each item in the inventory
   *
   * @returns {Number[]}
   */
  getRequiredSlots() {
    const sourceSlot = this.source.target.parentElement.parentElement.id

    return this.allItems.reduce((acc, cur) => {
      const allFlags = cur.getFlag(moduleName, flagFields.flags)
      const flagForSlot = allFlags.find((flag) => flag.split(',')[0].includes(sourceSlot))
      this.flagsForSlot.push(flagForSlot ?? '')
      if (!flagForSlot) return [...acc, 1]

      const necessarySlots = flagForSlot.split(', ').reduce((acc, cur) => acc + Number(cur.split('-')[0]), 0)

      return [...acc, necessarySlots]
    }, [])
  }

  getData(options) {
    return {
      allItems: this.allItems,
      filteredItems: this.filteredItems,
      requiredSlots: this.getRequiredSlots(),
      slotStructure: this.slotStructure,
      flagsForSlot: this.flagsForSlot
    }
  }

  /**
   * Creates an image tile in the place of the clicked button
   *
   * @param item {Item5e} - item to "equip"
   */
  createNewTile(item) {
    createImageTile(item, this.source.target);
    this.close();
  }

  /**
   * Creates the secondary image tiles for items that require multiple slots
   *
   * @param item {Item5e}
   * @param slotsAvailable {HTMLElement[]}
   * @param slotsRequired {Number}
   */
  createSecondaryTiles(item, slotsAvailable, slotsRequired) {
    for (let i = 0; i < slotsRequired; i++) {
      createImageTile(item, slotsAvailable[i], true)
    }
  }

  /**
   * Returns a list of slots that are not used with a given slot type
   * This list does not contain the slot that created the window
   *
   * @param location {string}
   * @returns {HTMLElement[]}
   */
  getAvailableSlotsAtLocation(location) {
    return [...document
      .querySelectorAll(availableSlots(location))]
      .filter((item) => item !== this.source.target)
  }

  /**
   * Updates the slot structure reference to show that an item and it's secondaries has been added
   * Note: modifying the slot structure here is propagated in paperDollApp.js
   *
   * @param item {Item5e}
   * @param slotName {String}
   * @param slotRequirement {Number}
   * @param onePrimary {Boolean}
   */
  updateSlotStructure(item, slotName, slotRequirement, onePrimary = true) {
    const availableIndexes = getAllIndexes(this.slotStructure[slotName], '')
    let itemsPlaced = 0

    if (onePrimary) {
      this.slotStructure[slotName][availableIndexes[0]] = item.id
      itemsPlaced++
    }

    for (let i = itemsPlaced; i < slotRequirement; i++) {
      this.slotStructure[slotName][availableIndexes[i]] = `${item.id}${shadowItemModifier}`
    }
  }

  /**
   * Gets the item from the id of the clicked object on the grid
   *
   * @param source {Event} - event trigger by the click
   * @param itemList {Item5e[]}- items available for equipment
   */
  prepareDataForNewTile(source, itemList) {
    const selectedItemId = source.currentTarget.id
    const selectedItem = itemList.find((item) => item.id === selectedItemId)
    const sourceSlotType = this.source.target.parentElement.parentElement.id
    const itemFlag = getCurrentFlagForItem(selectedItem, sourceSlotType)
    const flagArray = itemFlag?.split?.(', ')

    if (!flagArray) return this.createNewTile(selectedItem)

    flagArray.forEach((flag, index) => {
      const [slotRequirement, slotName] = flag.split('-')
      const secondarySlotsAvailable = this.getAvailableSlotsAtLocation(slotName)

      if (index === 0) {
        this.createNewTile(selectedItem)
        this.createSecondaryTiles(selectedItem, secondarySlotsAvailable, slotRequirement - 1)
        this.updateSlotStructure(selectedItem, slotName, slotRequirement)
      } else {
        this.createSecondaryTiles(selectedItem, secondarySlotsAvailable, slotRequirement)
        this.updateSlotStructure(selectedItem, slotName, slotRequirement, false)
      }
    })

  }

  /**
   * Hides the items that do not match the text into the search bar
   *
   * @param event {Event} - new character added to the search bar
   */
  searchItems(event) {
    const itemObjectsArray = [...event.currentTarget.parentNode.firstElementChild.children];

    itemObjectsArray.forEach((itemObject) => {
      const itemObjectText = itemObject.lastElementChild.innerText.toLowerCase();
      const searchText = event.currentTarget.value.toLowerCase();

      if (!itemObjectText.includes(searchText)) {
        itemObject.classList.add(itemNotInFilter)
      } else itemObject.classList.remove(itemNotInFilter)
    })
  }

  async _updateObject(event, formData) {
  }

  /**
   * Returns an array of the ids of the equipped items
   *
   * @returns {String[]}
   */
  findEquippedItems() {
    const IDs = [];
    document
      .querySelectorAll(allEquippedItems)
      .forEach((item) => IDs.push(item.id))
    return IDs;
  }

  /**
   * When the list is made all equipable items are loaded, this function hides the ones that do not match the filter on
   * the current slot, idk why I made it this way
   *
   * @param displayedItems {HTMLElement[]} - object of all the items in the list
   * @param filteredItems {Item5e[]} - the items that match the slot filter
   */
  hideNonFilteredItems(displayedItems, filteredItems) {
    const filteredItemsIds = [];
    const equippedItems = this.findEquippedItems();
    filteredItems.forEach((item) => filteredItemsIds.push(item.id));
    displayedItems.forEach((item) => {
      if (!(filteredItemsIds.includes(item.id)) || equippedItems.includes(item.id)) {
        item.classList.toggle(itemNotInFilter);
      }
    })
  }

  /**
   * Adds the tooltips for each item in the list
   *
   * @param html {HTMLElement}
   */
  linkItemsWithTooltips(html) {
    html.querySelectorAll(`.${itemWithNoSlots}`).forEach((item) => {
      let tooltip = html.querySelector(`.${item.id}`)

      linkWithTooltip(item, tooltip)
    })
  }

  /**
   * Equips an item on the standard foundry sheet
   *
   * @param itemId {String}
   */
  equipItem(itemId) {
    const item = this.allItems.find(entity => entity.id === itemId)
    item.update({[itemEquippedPath]: true})
  }

  activateListeners(html) {
    const itemsFromDisplay = [...document.querySelectorAll(`.${internalGrid}`)];
    itemsFromDisplay.forEach((item) => {
      if (item.classList.contains(itemWithNoSlots)) return

      item.addEventListener('click',
        (event) => {
          this.prepareDataForNewTile(event, this.allItems)
          this.equipItem(item.id)
        });
    })

    this.hideNonFilteredItems(itemsFromDisplay, this.filteredItems)

    const searchBar = document.querySelector(`.${searchBarClass}`);
    searchBar.addEventListener('input', this.searchItems)

    this.linkItemsWithTooltips(html[0])
  }
}