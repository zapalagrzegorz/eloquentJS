"use strict";
document.addEventListener('DOMContentLoaded', function () {
    // It should insert a list of <button> 
    // elements at the top of the node, one for each child element, containing text retrieved from the data-tabname attribute of the child.
    // All but one of the original children should be hidden (given a display style of none). 
    // The currently visible node can be selected by clicking the buttons.
    const body = document.body;
    function showTab(tabWrapper, event) {
        const setCSS = function (element) {
            element.matches(`[data-tabname=${tabnameToShow}`) ?
                element.classList.remove('none') : element.classList.add('none');
        };
        const tabnameToShow = event.target.textContent;
        tabWrapper.forEach(setCSS);
    }
    function buildTabButtons(element, index, array) {
        const button = document.createElement('button');
        button.innerText = element.dataset.tabname;
        button.addEventListener('click', showTab.bind(null, array));
        return button;
    }
    function asTabs(node) {
        const contentWrappers = [...node.children];
        const tabButtons = contentWrappers.map(buildTabButtons);
        tabButtons.forEach(function (tabButton) {
            body.insertBefore(tabButton, node);
        });
    }
    asTabs(document.querySelector("tab-panel"));
});
