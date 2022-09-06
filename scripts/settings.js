const moduleTitle = "Equipment-Paper-Doll"

const registerSetting = (key, data) => {
    game.settings.register(moduleTitle, key, data);
}

const registerSettings = () => {
    settingList.forEach((setting) => registerSetting(setting.key, setting.data))
}

const getSetting = (key) => game.settings.get(moduleTitle, key);

/**
 * Returns a list of all keywords to filter by on a body part
 *
 * @param slot - body part
 * @returns {*[]}
 */
const getFilterArray = (slot) => {
    const settingData = getSetting(`${slot}Filter`);
    return [...settingData.split(', ')];
}

/**
 * Returns a list of the number of available slots for each body part
 *
 * @param namesArray - list of body parts
 * @param sourceActor - actor
 * @returns {[]}
 */
const getItemsSlotArray = (namesArray, sourceActor) => {
    const itemSlotsArray = [];
    const personalSettings = sourceActor.getFlag(moduleTitle, 'personalSettings');
    namesArray.forEach((item) => {
        const settingName = `${item}Slots`
        const personalSettingsForItem = personalSettings?.filter((setting) => setting.name === settingName)[0]
        itemSlotsArray.push(personalSettingsForItem?.value || getSetting(settingName))
    });
    return itemSlotsArray;
}

const settingList = [
    {
        key: "headFilter",
        data: {
            type: String,
            name: "Head slot filter ",
            hint: "List of keywords that select items from actor's inventory for each slot",
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
            hint: 'Number of available slots for this body part',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "eyesFilter",
        data: {
            type: String,
            name: "Eyes slot filter ",
            hint: "List of keywords that select items from actor's inventory for each slot",
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
            hint: 'Number of available slots for this body part',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "neckFilter",
        data: {
            type: String,
            name: "Neck slot filter ",
            hint: "List of keywords that select items from actor's inventory for each slot",
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
            hint: 'Number of available slots for this body part',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "capeFilter",
        data: {
            type: String,
            name: "Cape slot filter ",
            hint: "List of keywords that select items from actor's inventory for each slot",
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
            hint: 'Number of available slots for this body part',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "backFilter",
        data: {
            type: String,
            name: "Back slot filter ",
            hint: "List of keywords that select items from actor's inventory for each slot",
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
            hint: 'Number of available slots for this body part',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "torsoFilter",
        data: {
            type: String,
            name: "Torso slot filter ",
            hint: "List of keywords that select items from actor's inventory for each slot",
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
            hint: 'Number of available slots for this body part',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "waistFilter",
        data: {
            type: String,
            name: "Waist slot filter ",
            hint: "List of keywords that select items from actor's inventory for each slot",
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
            hint: 'Number of available slots for this body part',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "wristsFilter",
        data: {
            type: String,
            name: "Wrists slot filter ",
            hint: "List of keywords that select items from actor's inventory for each slot",
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
            hint: 'Number of available slots for this body part',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "handsFilter",
        data: {
            type: String,
            name: "Hands slot filter ",
            hint: "List of keywords that select items from actor's inventory for each slot",
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
            hint: 'Number of available slots for this body part',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 2,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "feetFilter",
        data: {
            type: String,
            name: "Feet slot filter ",
            hint: "List of keywords that select items from actor's inventory for each slot",
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
            hint: 'Number of available slots for this body part',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "ringFilter",
        data: {
            type: String,
            name: "Ring slot filter ",
            hint: "List of keywords that select items from actor's inventory for each slot",
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
            hint: 'Number of available slots for this body part',
            range: {
                min: 1,
                max: 8,
                step: 1
            },
            default: 2,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "mainHandFilter",
        data: {
            type: String,
            name: "Main hand slot filter ",
            hint: "List of keywords that select items from actor's inventory for each slot",
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
            hint: 'Number of available slots for this body part',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "offHandFilter",
        data: {
            type: String,
            name: "Off hand slot filter ",
            hint: "List of keywords that select items from actor's inventory for each slot",
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
            hint: 'Number of available slots for this body part',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 1,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "tattooScalpSlots",
        data: {
            type: Number,
            name: 'Number of scalp tattoo slots',
            hint: 'Number of available slots for this body part for tattoos',
            range: {
                min: 1,
                max: 4,
                step: 1
            },
            default: 2,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "tattooArmLeftSlots",
        data: {
            type: Number,
            name: 'Number of left arm tattoo slots',
            hint: 'Number of available slots for this body part for tattoos',
            range: {
                min: 0,
                max: 4,
                step: 1
            },
            default: 4,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "tattooArmRightSlots",
        data: {
            type: Number,
            name: 'Number of right arm tattoo slots',
            hint: 'Number of available slots for this body part for tattoos',
            range: {
                min: 0,
                max: 4,
                step: 1
            },
            default: 4,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "tattooHandLeftSlots",
        data: {
            type: Number,
            name: 'Number of left hand tattoo slots',
            hint: 'Number of available slots for this body part for tattoos',
            range: {
                min: 0,
                max: 4,
                step: 1
            },
            default: 1,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "tattooHandRightSlots",
        data: {
            type: Number,
            name: 'Number of right hand tattoo slots',
            hint: 'Number of available slots for this body part for tattoos',
            range: {
                min: 0,
                max: 4,
                step: 1
            },
            default: 1,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "tattooTorsoSlots",
        data: {
            type: Number,
            name: 'Number of torso tattoo slots',
            hint: 'Number of available slots for this body part for tattoos',
            range: {
                min: 1,
                max: 8,
                step: 1
            },
            default: 8,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "tattooBackSlots",
        data: {
            type: Number,
            name: 'Number of back tattoo slots',
            hint: 'Number of available slots for this body part for tattoos',
            range: {
                min: 1,
                max: 8,
                step: 1
            },
            default: 8,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "tattooLegLeftSlots",
        data: {
            type: Number,
            name: 'Number of left leg tattoo slots',
            hint: 'Number of available slots for this body part for tattoos',
            range: {
                min: 0,
                max: 4,
                step: 1
            },
            default: 4,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "tattooLegRightSlots",
        data: {
            type: Number,
            name: 'Number of right leg tattoo slots',
            hint: 'Number of available slots for this body part for tattoos',
            range: {
                min: 0,
                max: 4,
                step: 1
            },
            default: 4,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "tattooFootLeftSlots",
        data: {
            type: Number,
            name: 'Number of left foot tattoo slots',
            hint: 'Number of available slots for this body part for tattoos',
            range: {
                min: 0,
                max: 4,
                step: 1
            },
            default: 1,
            scope: "world",
            config: true,
            restricted: true
        }
    },
    {
        key: "tattooFootRightSlots",
        data: {
            type: Number,
            name: 'Number of right foot tattoo slots',
            hint: 'Number of available slots for this body part for tattoos',
            range: {
                min: 0,
                max: 4,
                step: 1
            },
            default: 1,
            scope: "world",
            config: true,
            restricted: true
        }
    },
]

export {getFilterArray, registerSettings, getItemsSlotArray, getSetting}