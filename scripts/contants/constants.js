export const moduleName = 'Equipment-Paper-Doll'
export const flagFields = {
  flags: 'flags',
  data: 'data',
  personalSettings: 'personalSettings'
}

export const initialSlotStructure = {
  back: ['', '', '', ''],
  cape: ['', '', '', ''],
  eyes: ['', '', '', ''],
  feet: ['', '', '', ''],
  hands: ['', '', '', ''],
  head: ['', '', '', ''],
  mainHand: ['', '', '', ''],
  neck: ['', '', '', ''],
  offHand: ['', '', '', ''],
  ring: ['', '', '', '', '', '', '', ''],
  torso: ['', '', '', ''],
  waist: ['', '', '', ''],
  wrists: ['', '', '', '']
}

export const tattoosSlotStructure = {
  tattooHandLeft: ['', '', '', ''],
  tattooHandRight: ['', '', '', ''],
  tattooFootLeft: ['', '', '', ''],
  tattooFootRight: ['', '', '', ''],
  tattooArmLeft: ['', '', '', ''],
  tattooArmRight: ['', '', '', ''],
  tattooLegLeft: ['', '', '', ''],
  tattooLegRight: ['', '', '', ''],
  tattooTorso: ['', '', '', '','', '', '', ''],
  tattooBack: ['', '', '', '','', '', '', ''],
  tattooScalp: ['', '', '', '']
}

export const tattoosRenderOrder = ['tattooScalp', 'tattooArmLeft', 'tattooArmRight', 'tattooHandLeft', 'tattooHandRight', 'tattooTorso', 'tattooBack', 'tattooLegLeft', 'tattooLegRight', 'tattooFootLeft', 'tattooFootRight']

export const shadowItemModifier = '__secondary'
export const itemEquippedPath = 'data.equipped'

export const openSettingsButtonName = 'Open Settings'
export const inventorySlotsStep = 72;