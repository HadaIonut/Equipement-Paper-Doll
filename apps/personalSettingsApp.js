import {getItemsSlotArray, getSetting} from "../scripts/settings.js";

export default class personalSettingsApp extends FormApplication {
    constructor(sourceActor) {
        super();
        this.itemSlotNames = ['head', 'eyes', 'neck', 'cape', 'back', 'torso', 'waist', 'wrists', 'hands', 'ring', 'feet', 'mainHand', 'offHand'];
        this.sourceActor = sourceActor;
        this.currentSlotSettings = sourceActor.getFlag("Equipment-Paper-Doll", "personalSettings");
    }

    static get defaultOptions() {
        return {
            ...super.defaultOptions,
            id: "paper-doll-settings",
            template: "modules/Equipment-Paper-Doll/templates/personalSettingsApp.hbs",
            resizable: false,
            minimizable: true,
            title: "Paper Doll Settings",
            closeOnSubmit: true,
        }
    }

    constructItemsData() {
        const itemsData = [];
        this.itemSlotNames.forEach((slotName) => {
            const name = `${slotName}Slots`
            const current = this.currentSlotSettings?.filter((setting) => setting.name === slotName) || getSetting(name);
            itemsData.push({
                name: name,
                min: 1,
                max: name === 'ringSlots' ? 8: 4,
                current: current
            })
        })
        return itemsData;
    }

    getData(options) {
        return {
            items: this.constructItemsData()
        }
    }

    async _updateObject(event, formData) {
        await this.sourceActor.setFlag("Equipment-Paper-Doll", "personalSettings", formData)
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

}