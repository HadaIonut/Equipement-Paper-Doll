import {getItemsSlotArray, getSetting} from "../settings.js";
import itemSearchApp from "./itemSearchApp.js";

/**
 * Returns a filler slot
 *
 * @returns {*|jQuery|HTMLElement}
 */
const createFillerSlot = () => {
    return $('<div class="fillerElement"></div>')
}

/**
 * Returns an equip new item button
 *
 * @param filteredItems - items that can be equipped on this slot
 * @param allItems - all items held by the owner actor
 * @returns {*|jQuery|HTMLElement}
 */
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

    /**
     * Creates an array with the min/max/current/name value for each slot
     *
     * @returns {[{value: Number, min: 1, max: 4 or 8, current: Number}]}
     */
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
            items: this.constructItemsData(),
            image: this.currentSlotSettings?.filter(obj => obj.name === 'image')[0].value
        }
    }

    /**
     * Updates the paper doll with the new slot numbers
     *
     * @param numberOfSlots - new number of slots
     * @param formName - name of the slot type ex: "head", "eyes"
     */
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
    }

    /**
     * Stores setting as flags on actor
     *
     * @param event
     * @param formData
     * @returns {Promise<void>}
     * @private
     */
    async _updateObject(event, formData) {
        const formattedFromData = [];
        Object.keys(formData).forEach((formName) => {
            if (formName === 'img') {
                formattedFromData.push({
                    name: 'image',
                    value: formData[formName]
                })
            } else {
                const globalSetting = getSetting(formName);
                this.updatePaperDollView(formData[formName], formName);

                if (formData[formName] === globalSetting) return;

                formattedFromData.push({
                    name: formName,
                    value: formData[formName]
                })
            }

        })
        await this.sourceActor.setFlag("Equipment-Paper-Doll", "personalSettings", formattedFromData);
    }

    createFilePicker(html) {
        html.find($('.imageBrowser')).click(async (ev) => {
            await new FilePicker({
                type: 'image',
                current: this.currentSlotSettings?.filter(obj => obj.name === 'image')?.[0]?.value || '',
                callback: (path) => {
                    const paperDollImage = $('.paperDollImage')
                    paperDollImage.css('background', `url(./${path}) no-repeat center`);
                    paperDollImage.css('background-size', '600px 480px');
                    $('.imagePath').val(`./${path}`);
                }
            }).render(true);
        })

    }

    activateListeners(html) {
        this.createFilePicker(html);
        super.activateListeners(html);
    }

}