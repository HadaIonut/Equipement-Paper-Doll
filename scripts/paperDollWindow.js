import {itemTypes} from "./lib/itemTypesCreater.js"

export default class PaperDollWindow extends Application {
    constructor(sourceActor) {
        super();
        this.sourceActor = sourceActor;
        this.items = sourceActor.items.entries;
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

        return {
            ...super.defaultOptions,
            id: "paper-doll",
            template: "modules/Equipment-Paper-Doll/templates/paperDollWindow.hbs",
            resizable: false,
            height: "auto",
            width: 600,
            minimizable: true,
            title: "Paper Doll Viewer"
        }
    }

    getData(options) {
        return {

        }
    }
}