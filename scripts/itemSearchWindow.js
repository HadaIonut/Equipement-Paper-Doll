export default class itemSearchWindow extends FormApplication {
    constructor(itemList, source) {
        super();
        this.itemList = itemList;
        this.source = source;
    }

    static get defaultOptions() {
        return {
            ...super.defaultOptions,
            id: "item-search",
            template: "modules/Equipment-Paper-Doll/templates/itemSearchWindow.hbs",
            resizable: false,
            minimizable: false,
            closeOnSubmit: false,
            submitOnClose: true,
            submitOnChange: true,
        }
    }

    getData(options) {
        return {
            items: this.itemList
        }
    }

    async _updateObject(event, formData) {

    }

    createNewTile(item) {
        const newTile = $(`<img src="${item.data.img}" class="addedItem">`)[0];
        const location = this.source.currentTarget;
        location.replaceWith(newTile);
        //this.source.currentTarget.before(newTile);
        this.close();
    }

    activateListeners(html) {
        const itemsFromDisplay = html.find('.searchInternalGrid');
        itemsFromDisplay.on('click', (source) => {
            const selectedItemId = source.currentTarget.id;
            const selectedItem = this.itemList.filter((item) => item.data._id === selectedItemId)[0];
            this.createNewTile(selectedItem);
        })
    }
}