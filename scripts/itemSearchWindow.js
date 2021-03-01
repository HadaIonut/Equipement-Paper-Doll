export default class itemSearchWindow extends FormApplication {
    constructor(filteredItems, source) {
        super();
        this.filteredItems = filteredItems;
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
            filteredItems: this.filteredItems
        }
    }

    async _updateObject(event, formData) {

    }

    createNewTile(item) {
        const newTile = $(`<div id='${item.data._id}' class="addedItem"><img src="${item.data.img}" ></div>`)[0];
        const location = this.source.currentTarget;
        location.replaceWith(newTile);
        this.close();
    }

    prepareDataForNewTile(source, itemList) {
        const selectedItemId = source.currentTarget.id;
        const selectedItem = itemList.filter((item) => item.data._id === selectedItemId)[0];
        this.createNewTile(selectedItem);
    }

    searchItems(event) {
        const itemObjectsArray = [...event.currentTarget.parentNode.firstElementChild.children];

        itemObjectsArray.forEach((itemObject)=> {
            const itemObjectText = itemObject.lastElementChild.innerText.toLowerCase();
            const searchText = event.currentTarget.value.toLowerCase();

            if (!itemObjectText.includes(searchText)) {
                $(itemObject).hide();
            } else $(itemObject).show();
        })
    }

    activateListeners(html) {
        const itemsFromDisplay = html.find('.searchInternalGrid');
        itemsFromDisplay.on('click', (source) => this.prepareDataForNewTile(source, this.filteredItems));

        const searchBar = html.find('.searchBar');
        searchBar.on('input', this.searchItems)
    }
}