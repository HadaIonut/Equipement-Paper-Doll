import {createImageTile} from "../lib/imageTile.js";
import "../lib/popperJs/popper.min.js"
import {linkWithTooltip} from "../lib/tooltips.js";

export default class itemSearchApp extends FormApplication {
  constructor(filteredItems, allItems, source, availableSlots, categoryName) {
    super()
    this.filteredItems = filteredItems
    this.allItems = allItems
    this.source = source
    this.availableSlots = availableSlots
    this.categoryName = categoryName
  }

  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      id: "paper-doll-item-search",
      template: "modules/Equipment-Paper-Doll/templates/itemSearchApp.hbs",
      resizable: false,
      minimizable: false,
      submitOnClose: true,
      title: "Item Search",
    }
  }

  getRelevantFlags() {
    return this.allItems.reduce((acc, cur) => {
      const relevantFlagsForItem = cur.getFlag('Equipment-Paper-Doll', 'flags').reduce((acc, cur) => {
        return acc + cur.includes(this.categoryName) ? cur[0] : ''
      }, '')
      return [...acc, relevantFlagsForItem]
    }, [])
  }

  getData(options) {
    return {
      allItems: this.allItems,
      filteredItems: this.filteredItems,
      relevantFlags: this.getRelevantFlags(),
      availableSlots: this.availableSlots
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

  /**
   * Gets the item from the id of the clicked object on the grid
   *
   * @param source - event trigger by the click
   * @param itemList - items available for equipment
   */
  prepareDataForNewTile(source, itemList) {
    const selectedItemId = source.currentTarget.id;
    const selectedItemSlotsRequired = source.currentTarget.getAttribute('requiredSlots');
    const selectedItem = itemList.filter((item) => item.data._id === selectedItemId)[0];
    this.createNewTile(selectedItem);
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
        itemObject.classList.add('itemSearchApp__not-in-filter')
      } else itemObject.classList.remove('itemSearchApp__not-in-filter')
    })
  }

  async _updateObject(event, formData) {

  }

  findEquippedItems() {
    const IDs = [];
    document
      .querySelectorAll('.paperDollApp__item-slots-grid > .paperDollApp__added-item')
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
    displayedItems.forEach((item, index) => {
      if (!(filteredItemsIds.includes(item.id)) || equippedItems.includes(item.id)) {
        item.classList.toggle('itemSearchApp__not-in-filter');
      }
    })
  }

  linkItemsWithTooltips(html) {
    html.querySelectorAll('.itemSearchApp__no-slots').forEach((item) => {
      let tooltip = html.querySelector(`.${item.id}`)

      linkWithTooltip(item, tooltip)
    })
  }

  activateListeners(html) {
    const itemsFromDisplay = document.querySelectorAll('.itemSearchApp__internal-grid');
    itemsFromDisplay.forEach((item) => {
      if (item.classList.contains('itemSearchApp__no-slots')) return

      item.addEventListener('click',
        (event) => this.prepareDataForNewTile(event, this.allItems));
    })

    this.hideNonFilteredItems(itemsFromDisplay, this.filteredItems)

    const searchBar = document.querySelector('.itemSearchApp__search-bar');
    searchBar.addEventListener('input', this.searchItems)

    this.linkItemsWithTooltips(html[0])
  }
}