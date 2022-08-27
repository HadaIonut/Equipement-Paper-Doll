import {flagTitle, flagWrapper, removeFlagButtonClass} from "../contants/objectClassNames.js";

export const tagsEditAppData = {
  id: 'tags-edit',
  resizable: false,
  minimizable: true,
  closeOnSubmit: false,
  title: "Paper Doll Tags Editor",
}

export const flagComponent = (newFlag) => ({
  elementName: 'div',
  attributes: {
    className: flagWrapper
  },
  children: [{
    elementName: 'div',
    attributes: {
      className: flagTitle,
      innerText: newFlag
    }}, {
    elementName: 'button',
    attributes: {
      className: removeFlagButtonClass,
      id: newFlag,
      innerText: 'X'
    }
  }]
})