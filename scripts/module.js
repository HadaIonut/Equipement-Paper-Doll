import PaperDollApp from "./apps/paperDollApp.js";
import {registerSettings} from "./settings.js";

Hooks.once('init', async () => {});

Hooks.once('ready', async () => {
    CONFIG.debug.hooks = true;
    registerSettings();
});

Hooks.on('renderActorSheet', (obj, html) => {
    let element = html.find(".window-header .window-title");
    let button = $(`<a class="popout" style><i class="fas fa-ruler"></i>Open paper doll</a>`);
    button.on('click', () => {
        new PaperDollApp(obj.object).render(true);
    })
    element.after(button);
});