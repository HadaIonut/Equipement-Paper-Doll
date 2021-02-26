import {itemTypes} from "./lib/itemTypesCreater.js"
import {registerHelpers} from "./lib/handlebarsHelpers.js";

export default class PaperDollWindow extends FormApplication {
    constructor(sourceActor) {
        super();
        this.sourceActor = sourceActor;
        this.items = sourceActor.items.entries;
        this.selectedItems = this.sourceActor.getFlag("Equipment-Paper-Doll", "data");
        itemTypes(this.items);
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
            itemTypesArray: ['head', 'eyes', 'neck', 'shoulders', 'back', 'torso', 'waist', 'wrists', 'hands', 'ring', 'feet', 'legs'],
            items: this.items
        }
    }

    async _updateObject(event, formData) {
        await this.sourceActor.setFlag("Equipment-Paper-Doll", "data", formData)
    }

    activateListeners(html) {
        const addBoxes = html.find('.addBox');
        // addBoxes.each((index, box) => {
        //     box.on('click',function () {
        //         console.log('yes');
        //     })
        // })
        addBoxes.on('click', (source) => {
            const newDiv = $(`<div class="addBox" style="background: aqua"></div>`);
            const location = source.currentTarget.parentNode.parentNode.className;
            source.currentTarget[location === 'leftItem' ? 'before' : 'after'](newDiv[0]);
        } );
        super.activateListeners(html);
    }
}