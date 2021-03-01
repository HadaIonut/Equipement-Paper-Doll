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

    extractDataFromForm() {
        const divStructureArray = [...$('.paperDollImage')[0].children, ...$('.secondaryItems')[0].children];
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
                const newTile = $(`<div id='${item.data._id}' class="addedItem"><img src="${item.data.img}" ></div>`);
                slotsArray[index]?.replaceWith(newTile[0]);
            })
        })
    }

    async _updateObject(event, formData) {
        formData = this.extractDataFromForm();

        await this.sourceActor.setFlag("Equipment-Paper-Doll", "data", formData)
    }

    renderSearchWindow(source, selectedItems, allItems) {
        const location = source.currentTarget.parentNode.parentNode;
        new itemSearchWindow(selectedItems[location.id], source).render(true);
    }

    unequipItem (item) {
        const addBox = $('<button type="button" class="addBox"></button>');
        addBox.on('click', (source) => this.renderSearchWindow(source, this.filteredItems, this.items));
        item.replaceWith(addBox);
    }

    createNewContextMenu(html) {
        new ContextMenu(html, '.addedItem', [{
            name: 'Unequip item',
            icon: '<i class="fas fa-trash fa-fw"></i>',
            condition: () => true,
            callback: this.unequipItem.bind(this)
        }])
    }

    activateListeners(html) {
        const addBoxes = html.find('.addBox');
        addBoxes.on('click', (source) => this.renderSearchWindow(source, this.filteredItems, this.items));

        this.createNewContextMenu(html);
        this.replaceWithStoredItems(html, this.selectedItems, this.items)
        super.activateListeners(html);
    }
}