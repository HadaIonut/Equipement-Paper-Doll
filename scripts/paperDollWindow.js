import {itemTypes, itemNames} from "./lib/itemTypesCreater.js"

export default class PaperDollWindow extends FormApplication {
    constructor(sourceActor) {
        super();
        this.sourceActor = sourceActor;
        this.items = sourceActor.items.entries;
        this.selectedItems = this.sourceActor.getFlag("Equipment-Paper-Doll", "data");
        itemTypes(this.items);
    }

    static get defaultOptions() {
        //TODO remove this, it is shit
        Handlebars.registerHelper('times', function(n, block) {
            var accum = '';
            for(var i = 0; i < n; ++i)
                accum += block.fn(i);
            return accum;
        });

        Handlebars.registerHelper('leftOrRight', function (n) {
            return n % 2 === 0? "leftItem" : "rightItem";
        })

        Handlebars.registerHelper('shouldBeSelected', function (itemID, position, selectedItems) {
            return new Handlebars.SafeString(itemID === selectedItems?.[position] ? "selected" : '');
        })

        Handlebars.registerHelper('startingSelection', function (position, selectedItems) {
            return new Handlebars.SafeString(selectedItems?.[position] ? '' : 'selected');
        })

        Handlebars.registerHelper('getItemFromArray', function (array, position) {
            return array?.[position];
        })

        Handlebars.registerHelper('getItemPosition', function (index) {
            const positionsArray = ['75px', '55px', '50px', '35px', '35px', '25px', '35px', '25px', '50px', '35px', '75px', '55px'];
            return index % 2 === 0 ? `margin-left: ${positionsArray[index]}` : `margin-right: ${positionsArray[index]}`;
        })

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
            itemsTypeLocation: ['headL', 'headL', 'headL', 'handRight', 'body', 'body', 'body', 'handRight', 'handLeft', 'handRight', 'legLeft', 'legRight'],
            items: this.items
        }
    }

    async _updateObject(event, formData) {
        await this.sourceActor.setFlag("Equipment-Paper-Doll", "data", formData)
    }

    activateListeners(html) {
        super.activateListeners(html);
    }
}