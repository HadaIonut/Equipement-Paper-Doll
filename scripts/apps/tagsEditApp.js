import {allSlots, slotNames} from "../../constants/slotNames.js";
import {extractFlags} from "../lib/flagsExtracter.js";
import {createHTMLElement} from "../lib/headerButtonCreater.js";
import {flagFields, moduleName} from "../contants/constants.js";
import {flagComponent, tagsEditAppData} from "../components/tagsEditApp.js";
import {addFlagButton, flagTitle, removeFlagButtonClass} from "../contants/objectClassNames.js";

export default class TagsEditApp extends FormApplication {
  currentFlags
  item

  constructor(item) {
    super();
    this.currentFlags = new Set(Array.isArray(item.getFlag(moduleName, flagFields.flags)) ? item.getFlag(moduleName, flagFields.flags) : [])
    this.item = item
    if (this.currentFlags.size === 0) this.addExtractedFlags()
  }

  addExtractedFlags() {
    extractFlags(this.item).forEach((flag) => this.currentFlags.add(flag))
  }

  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      ...tagsEditAppData,
      template: 'modules/Equipment-Paper-Doll/templates/tagsEditApp.hbs',
    }
  }

  getData(options) {
    return {
      currentFlags: [...this.currentFlags],
      availableSlots: allSlots
    }
  }

  slotAlreadyExitsInFlag(newFlagContent, lastFlagContent) {
    return lastFlagContent.includes(newFlagContent.split('-')[1])
  }

  handleSecondaryFlags(newFlagContent) {
    const flagsContainer = this.form.querySelector('.tagsEditApp__flag-container')
    const lastFlag = flagsContainer.children[flagsContainer.children.length - 1]
    const lastFlagTitle = lastFlag.querySelector(`.${flagTitle}`)
    const lastFlagInData = Array.from(this.currentFlags).pop()

    if (this.slotAlreadyExitsInFlag(newFlagContent, lastFlagInData)) return

    this.currentFlags.delete(lastFlagInData)
    this.currentFlags.add(`${lastFlagInData}, ${newFlagContent}`)
    this.item.setFlag(moduleName, flagFields.flags, [...this.currentFlags])
    lastFlagTitle.innerText += `, ${newFlagContent}`
  }

  async _updateObject(event, formData) {
    if (event.submitter.classList.value === addFlagButton) {
      const newFlag = `${formData['number-input']}-${formData['slot-type']}`;

      if (formData['as-secondary']) return this.handleSecondaryFlags(newFlag)

      const newFlagWrapper = createHTMLElement(flagComponent(newFlag))
      if (!this.currentFlags.has(newFlag))
        this.form.querySelector('.tagsEditApp__flag-container').appendChild(newFlagWrapper)

      this.currentFlags.add(newFlag);
      this.item.setFlag(moduleName, flagFields.flags, [...this.currentFlags])
    } else if (event.submitter.classList.value === removeFlagButtonClass) {
      this.currentFlags.delete(event.submitter.id)
      event.submitter.parentElement.remove();
      this.item.setFlag(moduleName, flagFields.flags, [...this.currentFlags])
      }
  }

  activateListeners(html) {
    super.activateListeners(html);
  }
}