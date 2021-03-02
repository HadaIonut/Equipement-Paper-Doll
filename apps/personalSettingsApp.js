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
            const current = this.currentSlotSettings?.filter((setting) => setting.name === name) || getSetting(name);
            itemsData.push({
                ...current[0],
                min: 1,
                max: name === 'ringSlots' ? 8: 4,
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
        const formattedFromData = [];
        Object.keys(formData).forEach((formName) => formattedFromData.push({
            name: formName,
            value: formData[formName]
        }))
        await this.sourceActor.setFlag("Equipment-Paper-Doll", "personalSettings", formattedFromData)
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

}