import {createImageTile} from "./lib/imageTile.js";

export default class itemSearchWindow extends FormApplication {
    constructor(filteredItems, allItems, source) {
        super();
        this.filteredItems = filteredItems;
        this.allItems = allItems;
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
            allItems: this.allItems,
            filteredItems: this.filteredItems
        }
    }

    async _updateObject(event, formData) {

    }

    createNewTile(item) {
        createImageTile(item, this.source.currentTarget);
        this.close();
    }

    prepareDataForNewTile(source, itemList) {
        const selectedItemId = source.currentTarget.id;
        const selectedItem = itemList.filter((item) => item.data._id === selectedItemId)[0];
        this.createNewTile(selectedItem);
    }

    searchItems(event) {
        const itemObjectsArray = [...event.currentTarget.parentNode.firstElementChild.children];

        itemObjectsArray.forEach((itemObject) => {
            const itemObjectText = itemObject.lastElementChild.innerText.toLowerCase();
            const searchText = event.currentTarget.value.toLowerCase();

            if (!itemObjectText.includes(searchText)) {
                $(itemObject).hide();
            } else $(itemObject).show();
        })
    }

    hideNonFilteredItems(displayedItems, filteredItems) {
        const filteredItemsIds = [];
        filteredItems.forEach((item) => filteredItemsIds.push(item.data._id));
        displayedItems.each((index, item) => {
            if (!filteredItemsIds.includes(item.id))
                item.style.display = 'none';
        })
    }

    showAllItemsButton(html) {
        const lastButton = html.parent().parent()[0].firstElementChild.lastElementChild;
        const showAllButton = $(`<a class="popout"> Show all </a>`);
        showAllButton.on('click', (event) => {
            $('.searchGrid').children().show()
        })
        lastButton.before(showAllButton[0]);
    }

    activateListeners(html) {
        const itemsFromDisplay = html.find('.searchInternalGrid');
        itemsFromDisplay.on('click', (source) => this.prepareDataForNewTile(source, this.allItems));
        this.hideNonFilteredItems(itemsFromDisplay, this.filteredItems)
        this.showAllItemsButton(html);

        const searchBar = html.find('.searchBar');
        searchBar.on('input', this.searchItems)
    }
}