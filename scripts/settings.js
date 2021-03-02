const moduleTitle = "Equipment-Paper-Doll"

const registerSetting = (key, data) => {
    game.settings.register(moduleTitle, key, data);
}

const registerSettings = () => {
    settingList.forEach((setting) => registerSetting(setting.key, setting.data))
}

const getSetting = (key) => game.settings.get(moduleTitle, key);

const getFilterArray = (slot) => {
    const settingData = getSetting(`${slot}Filter`);
    return [...settingData.split(', ')];
}

const getItemsSlotArray = (namesArray) => {
    const itemSlotsArray = [];
    namesArray.forEach((item) => itemSlotsArray.push(getSetting(`${item}Slots`)));
    return itemSlotsArray;
}

const settingList = [
    {
        key: "headFilter",
        data: {
            type: String,
            name: "Head slot filter ",
            default: "helmet, circlet, headband, helm, crown, hat",
            scope: "world",
            config: true,
            restricted: true,
        },
    },
    {
        key: "headSlots",
        data: {
            type: Number,
            name: 'Number of head slots',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            config: true,
            restricted: true
        }
    },
    {
        key: "eyesFilter",
        data: {
            type: String,
            name: "Eyes slot filter ",
            default: "goggle, eye",
            scope: "world",
            config: true,
            restricted: true,
        },
    },
    {
        key: "eyesSlots",
        data: {
            type: Number,
            name: 'Number of eyes slots',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            config: true,
            restricted: true
        }
    },
    {
        key: "neckFilter",
        data: {
            type: String,
            name: "Neck slot filter ",
            default: "amulet, necklace, periapt",
            scope: "world",
            config: true,
            restricted: true,
        },
    },
    {
        key: "neckSlots",
        data: {
            type: Number,
            name: 'Number of neck slots',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            config: true,
            restricted: true
        }
    },
    {
        key: "capeFilter",
        data: {
            type: String,
            name: "Cape slot filter ",
            default: "cape, backpack, haversack, mantle, robe, cloak",
            scope: "world",
            config: true,
            restricted: true,
        },
    },
    {
        key: "capeSlots",
        data: {
            type: Number,
            name: 'Number of cape slots',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            config: true,
            restricted: true
        }
    },
    {
        key: "backFilter",
        data: {
            type: String,
            name: "Back slot filter ",
            default: "",
            scope: "world",
            config: true,
            restricted: true,
        },
    },
    {
        key: "backSlots",
        data: {
            type: Number,
            name: 'Number of back slots',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            config: true,
            restricted: true
        }
    },
    {
        key: "torsoFilter",
        data: {
            type: String,
            name: "Torso slot filter ",
            default: "breastplate, armor, mail, mantle, chain, plate, clothes, shirt",
            scope: "world",
            config: true,
            restricted: true,
        },
    },
    {
        key: "torsoSlots",
        data: {
            type: Number,
            name: 'Number of torso slots',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            config: true,
            restricted: true
        }
    },
    {
        key: "waistFilter",
        data: {
            type: String,
            name: "Waist slot filter ",
            default: "belt",
            scope: "world",
            config: true,
            restricted: true,
        },
    },
    {
        key: "waistSlots",
        data: {
            type: Number,
            name: 'Number of waist slots',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            config: true,
            restricted: true
        }
    },
    {
        key: "wristsFilter",
        data: {
            type: String,
            name: "Wrists slot filter ",
            default: "shackle, manacles, bracers",
            scope: "world",
            config: true,
            restricted: true,
        },
    },
    {
        key: "wristsSlots",
        data: {
            type: Number,
            name: 'Number of wrists slots',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            config: true,
            restricted: true
        }
    },
    {
        key: "handsFilter",
        data: {
            type: String,
            name: "Hands slot filter ",
            default: "gloves",
            scope: "world",
            config: true,
            restricted: true,
        },
    },
    {
        key: "handsSlots",
        data: {
            type: Number,
            name: 'Number of hands slots',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 2,
            config: true,
            restricted: true
        }
    },
    {
        key: "feetFilter",
        data: {
            type: String,
            name: "Feet slot filter ",
            default: "boot",
            scope: "world",
            config: true,
            restricted: true,
        },
    },
    {
        key: "feetSlots",
        data: {
            type: Number,
            name: 'Number of feet slots',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            config: true,
            restricted: true
        }
    },
    {
        key: "ringFilter",
        data: {
            type: String,
            name: "Ring slot filter ",
            default: "ring",
            scope: "world",
            config: true,
            restricted: true,
        },
    },
    {
        key: "ringSlots",
        data: {
            type: Number,
            name: 'Number of ring slots',
            range: {
                min: 1,
                max: 8,
                step: 1
            },
            default: 2,
            config: true,
            restricted: true
        }
    },
    {
        key: "mainHandFilter",
        data: {
            type: String,
            name: "Main hand slot filter ",
            default: "",
            scope: "world",
            config: true,
            restricted: true,
        },
    },
    {
        key: "mainHandSlots",
        data: {
            type: Number,
            name: 'Number of main hand slots',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            config: true,
            restricted: true
        }
    },
    {
        key: "offHandFilter",
        data: {
            type: String,
            name: "Off hand slot filter ",
            default: "shield",
            scope: "world",
            config: true,
            restricted: true,
        },
    },
    {
        key: "offHandSlots",
        data: {
            type: Number,
            name: 'Number of off hand slots',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            config: true,
            restricted: true
        }
    },

]

export {getFilterArray, registerSettings, getItemsSlotArray}