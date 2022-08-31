import {createImageTile} from "../lib/imageTile.js";
import "../lib/popperJs/popper.min.js"
import {linkWithTooltip} from "../lib/tooltips.js";
import {weaponSlotNames} from "../../constants/slotNames.js";
import {itemSearchAppData} from "../components/itemSearchApp.js";
import {flagFields, itemEquippedPath, moduleName} from "../contants/constants.js";
import {allEquippedItems, availableSlots} from "../contants/commonQuerries.js";
import {
  addBoxClass,
  internalGrid,
  itemNotInFilter,
  itemWithNoSlots,
  searchBarClass
} from "../contants/objectClassNames.js";

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

  getRequiredSlots() {
    const sourceSlot = this.source.target.parentElement.parentElement.id

    return this.allItems.reduce((acc, cur) => {
      const allFlags = cur.getFlag(moduleName, flagFields.flags)
      const flagForSlot = allFlags.find((flag) => flag.split(',')[0].includes(sourceSlot))
      this.flagsForSlot.push(flagForSlot ?? '')
      if (!flagForSlot) return [...acc, 1]

      const necessarySlots = flagForSlot.split(', ').reduce((acc, cur) => acc + Number(cur.split('-')[0]),0)

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
   * @param item - item to "equip"
   */
  createNewTile(item) {
    createImageTile(item, this.source.target);
    this.close();
  }

  createSecondaryTiles(item, slotsAvailable, slotsRequired) {
    for (let i = 0; i < slotsRequired; i++) {
      createImageTile(item, slotsAvailable[i], true)
    }
  }

  getAvailableSlotsAtLocation(location) {
    return [...document
      .querySelectorAll(availableSlots(location))]
      .filter((item) => item !== this.source.target)
  }

  mergeHandSlots(offHand, mainHand) {
    return offHand.reduce((acc, cur, index) => {
      if (mainHand[index])
        return [
          ...acc,
          cur,
          mainHand[index]
        ]
      return [
        ...acc,
        cur,
      ]
    }, [])
  }

  getCurrentFlagForItem(item, sourceSlot) {
    const allFlags = item.getFlag(moduleName, flagFields.flags)

    return allFlags.find((flag) => flag.split(',')[0].includes(sourceSlot))
  }

  /**
   * Gets the item from the id of the clicked object on the grid
   *
   * @param source - event trigger by the click
   * @param itemList - items available for equipment
   */
  prepareDataForNewTile(source, itemList) {
    const selectedItemId = source.currentTarget.id
    const selectedItemSlotsRequired = source.currentTarget.getAttribute('requiredSlots')
    const selectedItem = itemList.filter((item) => item.data._id === selectedItemId)[0]
    const sourceSlotType = this.source.target.parentElement.parentElement.id
    const itemFlag = this.getCurrentFlagForItem(selectedItem, sourceSlotType)
    console.log(itemFlag) //TODO make item take the flagged slots
    let secondarySlotsAvailable;

    if (weaponSlotNames.includes(sourceSlotType)) {
      const mainHandSlots = this.getAvailableSlotsAtLocation(weaponSlotNames[0])
      const offHandSlots = this.getAvailableSlotsAtLocation(weaponSlotNames[1])

      secondarySlotsAvailable = this.mergeHandSlots(offHandSlots, mainHandSlots)
    } else {
      secondarySlotsAvailable = [...this.source.target.parentNode
        .querySelectorAll(`.${addBoxClass}`)]
        .filter((item) => item !== this.source.target)
    }


    this.createSecondaryTiles(selectedItem, secondarySlotsAvailable, selectedItemSlotsRequired - 1)
    this.createNewTile(selectedItem)
  }

  /**
   * Hides the items that do not match the text into the search bar
   *
   * @param event - new character added to the search bar
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
   * @param displayedItems - JQ object of all the items in the list
   * @param filteredItems - the items that match the slot filter
   */
  hideNonFilteredItems(displayedItems, filteredItems) {
    const filteredItemsIds = [];
    const equippedItems = this.findEquippedItems();
    filteredItems.forEach((item) => filteredItemsIds.push(item.data._id));
    displayedItems.forEach((item) => {
      if (!(filteredItemsIds.includes(item.id)) || equippedItems.includes(item.id)) {
        item.classList.toggle(itemNotInFilter);
      }
    })
  }

  linkItemsWithTooltips(html) {
    html.querySelectorAll(`.${itemWithNoSlots}`).forEach((item) => {
      let tooltip = html.querySelector(`.${item.id}`)

      linkWithTooltip(item, tooltip)
    })
  }

  equipItem(itemId) {
    const item = this.allItems.find(entity => entity.data._id === itemId)
    item.update({[itemEquippedPath]: true})
  }

  activateListeners(html) {
    const itemsFromDisplay = document.querySelectorAll(`.${internalGrid}`);
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