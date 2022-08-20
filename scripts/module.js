import PaperDollApp from "./apps/paperDollApp.js";
import {registerSettings} from "./settings.js";
import itemSearchApp from "./apps/itemSearchApp.js";
import TagsEditApp from "./apps/tagsEditApp.js";
import {createHeaderButton, insertAfter, insertBefore} from "./lib/headerButtonCreater.js";

Hooks.once('init', async () => {
});

Hooks.once('ready', async () => {
  CONFIG.debug.hooks = true;
  registerSettings();
});

Hooks.on('renderActorSheet', (obj, html) => {
  let element = html[0].querySelector(".window-header .window-title");
  let button = createHeaderButton('Open Paper Doll');
  button.addEventListener('click', () => {
    new PaperDollApp(obj.object).render(true);
  })
  insertAfter(element, button);
});

Hooks.on('renderitemSearchApp', (app, html) => {
  const closeButton = html[0].querySelector('.header-button');
  const showAllButton  = createHeaderButton('Show All')
  showAllButton.addEventListener('click', () => {
    const itemsFromDisplay = document.querySelectorAll('.itemSearchApp__internal-grid');
    itemsFromDisplay.forEach((item) => {
      item.classList.remove('itemSearchApp__not-in-filter')
    })
  })
  insertBefore(closeButton,showAllButton);
})

Hooks.on('renderItemSheet', (item, html) => {
  const closeButton = html[0].querySelector('.header-button')
  const editTagsButton = createHeaderButton('Edit Tags')
  editTagsButton.addEventListener('click', () => {
    new TagsEditApp(item.object).render(true)
  })

  insertBefore(editTagsButton, closeButton);
})