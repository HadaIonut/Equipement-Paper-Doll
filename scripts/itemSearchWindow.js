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
        const newTile = $(`<div class="addedItem"><img src="${item.data.img}" ></div>`)[0];
        const location = this.source.currentTarget;
        location.replaceWith(newTile);
        this.close();
    }

    activateListeners(html) {
        const itemsFromDisplay = html.find('.searchInternalGrid');
        itemsFromDisplay.on('click', (source) => {
            const selectedItemId = source.currentTarget.id;
            const selectedItem = this.itemList.filter((item) => item.data._id === selectedItemId)[0];
            this.createNewTile(selectedItem);
        })
        const searchBar = html.find('.searchBar');
        searchBar.on('input', (event) => {
            const itemObjectsArray = [...event.currentTarget.parentNode.firstElementChild.children];
            itemObjectsArray.forEach((itemObject)=> {
                const itemObjectText = itemObject.lastElementChild.innerText.toLowerCase()
                const searchText = event.currentTarget.value.toLowerCase()
                if (!itemObjectText.includes(searchText)) {
                    $(itemObject).hide()
                } else $(itemObject).show()
            })
        })
    }
}