import {slotNames} from "../../constants/slotNames.js";
import {extractFlags} from "../lib/flagsExtracter.js";

export default class TagsEditApp extends FormApplication {
  currentFlags
  item

  constructor(item) {
    super();
    this.currentFlags = new Set(Array.isArray(item.getFlag('Equipment-Paper-Doll', 'flags')) ? item.getFlag('Equipment-Paper-Doll', 'flags') : [])
    this.item = item
    if (this.currentFlags.size === 0) this.addExtractedFlags()
  }

  addExtractedFlags() {
    extractFlags(this.item).forEach((flag) => this.currentFlags.add(flag))
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
    if (event.submitter.classList.value === 'tagsEditApp__add-flag-button') {
      const newFlag = `${formData['number-input']}-${formData['slot-type']}`;
      const newFlagElement = document.createElement('div');
      newFlagElement.innerText = newFlag;
      newFlagElement.classList.add('tagsEditApp__flag-tile');

      if (!this.currentFlags.has(newFlag)) this.form.querySelector('.tagsEditApp__flag-container').appendChild(newFlagElement)

      this.currentFlags.add(newFlag);
      this.item.setFlag('Equipment-Paper-Doll', 'flags', [...this.currentFlags])

    } else if (event.submitter.classList.value === 'tagsEditApp__remove-flag') {
      this.currentFlags.delete(event.submitter.id)
      event.submitter.parentElement.remove();
      this.item.setFlag('Equipment-Paper-Doll', 'flags', [...this.currentFlags])
    }
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}