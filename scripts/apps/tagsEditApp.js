import {attributeToFlagMap} from "../../constants/flagMaps.js";
import {slotNames} from "../../constants/slotNames.js";

export default class TagsEditApp extends FormApplication {
  currentFlags
  item

  constructor(item) {
    super();
    this.currentFlags = new Set(Array.isArray(item.getFlag('Equipment-Paper-Doll', 'flags')) ? item.getFlag('Equipment-Paper-Doll', 'flags') : [])
    this.item = item
    if (this.currentFlags.size === 0) this.extractFlags()
  }

  extractFlags() {
    if (!this?.item?.data?.data?.properties) return;

    Object.entries(this.item.data.data.properties).forEach(([key, value]) => {
      if (value && attributeToFlagMap[key]) this.currentFlags.add(...attributeToFlagMap[key])
    })
    this.item.setFlag('Equipment-Paper-Doll', 'flags', [...this.currentFlags])
  }

  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      id: 'tags-edit',
      template: 'modules/Equipment-Paper-Doll/templates/tagsEditApp.hbs',
      resizable: false,
      minimizable: true,
      closeOnSubmit: false,
      title: "Paper Doll Tags Editor",
    }
  }

  getData(options) {
    return {
      currentFlags: [...this.currentFlags],
      availableSlots: slotNames
    }
  }

  async _updateObject(event, formData) {
    if (event.submitter.classList.value === 'add-flag-button') {
      const newFlag = `${formData['number-input']}-${formData['slot-type']}`;
      const newFlagElement = document.createElement('div');
      newFlagElement.innerText = newFlag;
      newFlagElement.classList.add('flag-tile');

      if (!this.currentFlags.has(newFlag)) this.form.querySelector('.flag-container').appendChild(newFlagElement)

      this.currentFlags.add(newFlag);
      this.item.setFlag('Equipment-Paper-Doll', 'flags', [...this.currentFlags])

    } else if (event.submitter.classList.value === 'remove-flag') {
      this.currentFlags.delete(event.submitter.id)
      event.submitter.parentElement.remove();
      this.item.setFlag('Equipment-Paper-Doll', 'flags', [...this.currentFlags])
    }

    console.log(event, formData, this)
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}