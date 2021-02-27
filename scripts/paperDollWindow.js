import {filterActorItems} from "./lib/itemFiltering.js"
import {registerHelpers} from "./lib/handlebarsHelpers.js";
import itemSearchWindow from "./itemSearchWindow.js";

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
            closeOnSubmit: false,
            submitOnClose: true,
            submitOnChange: true
        }
    }

    getData(options) {
        return {
            selectedItems: this.selectedItems,
            itemTypesArray: ['head', 'eyes', 'neck', 'cape', 'back', 'torso', 'waist', 'wrists', 'hands', 'ring', 'feet'],
            items: {...this.filteredItems}
        }
    }

    async _updateObject(event, formData) {
        await this.sourceActor.setFlag("Equipment-Paper-Doll", "data", formData)
    }

    activateListeners(html) {
        const addBoxes = html.find('.addBox');
        addBoxes.on('click', (source) => {
            const location = source.currentTarget.parentNode.parentNode;
            new itemSearchWindow(this.filteredItems[location.id], source).render(true);
        });
        super.activateListeners(html);
    }
}