export default class PaperDollWindow extends Application {
    constructor(sourceActor) {
        super();
        this.sourceActor = sourceActor;
        this.items = sourceActor.items.entries;
    }

    static get defaultOptions() {
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