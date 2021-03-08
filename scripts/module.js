import PaperDollApp from "./apps/paperDollApp.js";
import {registerSettings} from "./settings.js";
import itemSearchApp from "./apps/itemSearchApp.js";

Hooks.once('init', async () => {});

Hooks.once('ready', async () => {
    CONFIG.debug.hooks = true;
    registerSettings();
});

Hooks.on('renderActorSheet', (obj, html) => {
    let element = html.find(".window-header .window-title");
    let button = $(`<a class="popout" style><i class="fas fa-ruler"></i>Open Paper Doll</a>`);
    button.on('click', () => {
        const itemSearch = new itemSearchApp;
        new PaperDollApp(obj.object, itemSearch).render(true);
    })
    element.after(button);
});

Hooks.on('renderitemSearchApp', (app, html) => {
    const closeButton = html.find('.header-button');
    const showAllButton = $(`<a class="popout"> Show all </a>`);
    showAllButton.on('click', () => {
        const items = $('.searchGrid').children();
        items.show();
        items.removeClass('notInFilter');
    })
    closeButton.before(showAllButton[0]);
})