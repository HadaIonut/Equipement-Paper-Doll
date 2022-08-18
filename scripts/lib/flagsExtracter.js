import {attributeToFlagMap} from "../../constants/flagMaps.js";

export const extractFlags = (item) => {
  let flags = new Set()
  if (!item?.data?.data?.properties) return []

  Object.entries(item.data.data.properties).forEach(([key, value]) => {
    if (value && attributeToFlagMap[key]) flags.add(...attributeToFlagMap[key])
  })

  return [...flags]
}