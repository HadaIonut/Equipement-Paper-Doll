import {filterActorItems, filterEquipableItems} from "../scripts/lib/itemFiltering.js"
import {registerHelpers} from "../scripts/lib/handlebarsHelpers.js";
import itemSearchApp from "./itemSearchApp.js";
import {getItemsSlotArray} from "../scripts/settings.js";
import {createImageTile} from "../scripts/lib/imageTile.js";
import personalSettingsApp from "./personalSettingsApp.js";

export default class PaperDollApp extends FormApplication {
    constructor(sourceActor) {
        super();
        this.sourceActor = sourceActor;
        this.items = sourceActor.items.entries;
        this.selectedItems = this.sourceActor.getFlag("Equipment-Paper-Doll", "data");
        this.equipableItems = filterEquipableItems(this.items);
        this.filteredItems = filterActorItems(this.items);
    }

    static get defaultOptions() {
        registerHelpers()
        return {
            ...super.defaultOptions,
            id: "paper-doll",
            template: "modules/Equipment-Paper-Doll/templates/paperDollApp.hbs",
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
                slots: getItemsSlotArray(itemSlotNames, this.sourceActor)
            },
            items: {...this.filteredItems},
            weaponsTypes: {
                types: weaponSlotNames,
                slots: getItemsSlotArray(weaponSlotNames, this.sourceActor)
            }
        }
    }

    extractDataFromForm() {
        const divStructureArray = [...$('.paperDollImage')[0].children, ...$('.secondaryItems')[0].children];
        const formData = {};
        divStructureArray.forEach((element) => {
            const dataPoints = [...element.lastElementChild.children];
            const fieldData = [];

            dataPoints.forEach(point => {
                if (point.id !== 'tooltip') fieldData.push(point.id)
            });
            formData[element.id] = fieldData;
        })

        return formData;
    }

    replaceWithStoredItems(html, storedItems, actorItems) {
        if (!storedItems) return;
        Object.keys(storedItems).forEach((itemType) => {
            const slotsArray = [...html.find(`#${itemType}`).children('.itemSlotsGrid').children('button')];
            storedItems[itemType].forEach((itemSlot, index) => {
                if (itemSlot === '') return;

                const item = actorItems.filter(localItem => localItem.data._id === itemSlot)[0];
                createImageTile(item, slotsArray[index])
            })
        })
    }

    async _updateObject(event, formData) {
        formData = this.extractDataFromForm();

        await this.sourceActor.setFlag("Equipment-Paper-Doll", "data", formData)
    }

    renderSearchWindow(source, selectedItems, allItems) {
        const location = source.currentTarget.parentNode.parentNode;
        new itemSearchApp(selectedItems[location.id], allItems ,source).render(true);
    }

    unequipItem (item) {
        const addBox = $('<button type="button" class="addBox"></button>');
        addBox.on('click', (source) => this.renderSearchWindow(source, this.filteredItems, this.equipableItems));
        item.parent().children().each((index, element) => {
            if (element.nodeName === 'SPAN' && element.id === 'tooltip' && element.className === `${item[0].id}`) element.remove();
        })
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

    openPersonalSettings(html) {
        const lastButton = html.parent().parent()[0].firstElementChild.lastElementChild;
        const openSettingsButton = $(`<a class="popout"> Open Settings </a>`);
        openSettingsButton.on('click', () => {
            new personalSettingsApp(this.sourceActor, this.filteredItems, this.equipableItems).render(true);
        })
        lastButton.before(openSettingsButton[0]);
    }

    activateListeners(html) {
        const addBoxes = html.find('.addBox');
        addBoxes.on('click', (source) => this.renderSearchWindow(source, this.filteredItems, this.equipableItems));

        this.replaceWithStoredItems(html, this.selectedItems, this.items)
        this.openPersonalSettings(html);
        this.createNewContextMenu(html);
        super.activateListeners(html);
    }
}