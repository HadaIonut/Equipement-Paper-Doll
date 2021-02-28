import {filterActorItems} from "./lib/itemFiltering.js"
import {registerHelpers} from "./lib/handlebarsHelpers.js";
import itemSearchWindow from "./itemSearchWindow.js";
import {getItemsSlotArray} from "./settings.js";

export default class PaperDollWindow extends FormApplication {
    constructor(sourceActor) {
        super();
        this.sourceActor = sourceActor;
        this.items = sourceActor.items.entries;
        this.selectedItems = this.sourceActor.getFlag("Equipment-Paper-Doll", "data");
        this.filteredItems = filterActorItems(this.items)
    }

    static get defaultOptions() {
        registerHelpers()
        return {
            ...super.defaultOptions,
            id: "paper-doll",
            template: "modules/Equipment-Paper-Doll/templates/paperDollWindow.hbs",
            resizable: false,
            minimizable: true,
            title: "Paper Doll Viewer",
            closeOnSubmit: true,
        }
    }

    getData(options) {
        const itemSlotNames = ['head', 'eyes', 'neck', 'cape', 'back', 'torso', 'waist', 'wrists', 'hands', 'ring', 'feet'];
        const weaponSlotNames = ['mainHand', 'offHand'];
        return {
            selectedItems: this.selectedItems,
            itemTypes: {
                types: itemSlotNames,
                slots: getItemsSlotArray(itemSlotNames)
            },
            items: {...this.filteredItems},
            weaponsTypes: {
                types: weaponSlotNames,
                slots: getItemsSlotArray(weaponSlotNames)
            }
        }
    }

    extractDataFromForm(event) {
        const divStructureArray = [...event.path[1].firstElementChild.firstElementChild.firstElementChild.children];
        const formData = {};
        divStructureArray.forEach((element) => {
            const dataPoints = [...element.lastElementChild.children];
            const fieldData = [];

            dataPoints.forEach(point => fieldData.push(point.id));
            formData[element.id] = fieldData;
        })

        return formData;
    }

    replaceWithStoredItems(html, storedItems, actorItems) {
        Object.keys(storedItems).forEach((itemType) => {
            storedItems[itemType].forEach((itemSlot, index) => {
                if (itemSlot === '') return;

                const slotsArray = [...html.find(`#${itemType}`)[0].lastElementChild.children];
                const item = actorItems.filter(localItem => localItem.data._id === itemSlot)[0];
                const newTile = $(`<div id='${item.data._id}' class="addedItem"><img src="${item.data.img}" ></div>`)[0];
                slotsArray[index]?.replaceWith(newTile);
            })
        })
    }

    async _updateObject(event, formData) {
        formData = this.extractDataFromForm(event);

        await this.sourceActor.setFlag("Equipment-Paper-Doll", "data", formData)
    }

    activateListeners(html) {
        const addBoxes = html.find('.addBox');
        addBoxes.on('click', (source) => {
            const location = source.currentTarget.parentNode.parentNode;
            new itemSearchWindow(this.filteredItems[location.id], source).render(true);
        });

        this.replaceWithStoredItems(html, this.selectedItems, this.items)
        super.activateListeners(html);
    }
}