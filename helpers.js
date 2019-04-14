/* eslint-disable no-restricted-syntax */

function elt(name, attrs, ...children) {
  const dom = document.createElement(name);
  // {required: true}
  for (const attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (const child of children) {
    dom.appendChild(child);
  }
  return dom;
}
