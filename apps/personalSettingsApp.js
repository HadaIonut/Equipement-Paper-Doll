import {getItemsSlotArray, getSetting} from "../scripts/settings.js";
import itemSearchApp from "./itemSearchApp.js";

const createFillerSlot = () => {
    return $('<div class="fillerElement"></div>')
}

const createButtonSlot = (filteredItems, allItems) => {
    const button = $('<button type="button" class="addBox"></button>');
    button.on('click', (event) => {
        new itemSearchApp(filteredItems, allItems, event).render(true);
    })
    return button;
}

export default class personalSettingsApp extends FormApplication {
    constructor(sourceActor, filteredItems, allItems) {
        super();
        this.itemSlotNames = ['head', 'eyes', 'neck', 'cape', 'back', 'torso', 'waist', 'wrists', 'hands', 'ring', 'feet', 'mainHand', 'offHand'];
        this.sourceActor = sourceActor;
        this.currentSlotSettings = sourceActor.getFlag("Equipment-Paper-Doll", "personalSettings");
        this.filteredItems = filteredItems;
        this.allItems = allItems;
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
            const globalSettingsObject = {
                name: name,
                value: getSetting(name)
            }
            const current = this.currentSlotSettings?.filter((setting) => setting.name === name)[0] || globalSettingsObject;
            itemsData.push({
                ...current,
                min: 1,
                max: name === 'ringSlots' ? 8 : 4,
            })
        })
        return itemsData;
    }

    getData(options) {
        return {
            items: this.constructItemsData()
        }
    }

    updatePaperDollView(numberOfSlots, formName) {
        const gridName = formName.slice(0, -5);
        const location = $(`#${gridName}`).children('.itemSlotsGrid');
        const unusableSlots = location.children('.fillerElement').length;
        const usableSlots = (gridName === 'ring' ? 8 : 4) - unusableSlots;

        if (numberOfSlots < usableSlots) {
            //replace usable with filler
            const replaceableSlots = location.children('div .addedItem, button').slice(numberOfSlots, usableSlots);
            replaceableSlots.replaceWith(createFillerSlot());
        } else if (numberOfSlots > usableSlots) {
            //replace filler with usable
            const replaceableSlots = location.children('div .fillerElement').slice(0, numberOfSlots - usableSlots);
            replaceableSlots.replaceWith(createButtonSlot(this.filteredItems[gridName], this.allItems))

        }
        // const elementsToReplace = location.slice(0,)
    }

    async _updateObject(event, formData) {
        const formattedFromData = [];
        Object.keys(formData).forEach((formName) => {
            const globalSetting = getSetting(formName);
            this.updatePaperDollView(formData[formName], formName);

            if (formData[formName] === globalSetting) return;

            formattedFromData.push({
                name: formName,
                value: formData[formName]
            })
        })
        await this.sourceActor.setFlag("Equipment-Paper-Doll", "personalSettings", formattedFromData);
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

}