
document.addEventListener('DOMContentLoaded', function () {
    // It should insert a list of <button> 
    // elements at the top of the node, one for each child element, containing text retrieved from the data-tabname attribute of the child.
    // All but one of the original children should be hidden (given a display style of none). 
    // The currently visible node can be selected by clicking the buttons.

    const body = document.body;


    function showTab (tabWrapper : HTMLElement[], event : Event, ) {
        const setCSS: (value: HTMLElement, index: number, array: HTMLElement[]) => void = function (element: Element) {
            element.matches(`[data-tabname=${tabnameToShow}`) ?
                element.classList.remove('none') : element.classList.add('none');
        };
        const tabnameToShow = (event.target as Element).textContent;
        tabWrapper.forEach( setCSS);
    }

    function buildTabButtons (element: HTMLElement, index: number, array : HTMLElement[]) {
        const button = document.createElement('button');
        button.innerText = element.dataset.tabname!;

        button.addEventListener('click', showTab.bind(null, array));

        return button;
    }

    function asTabs(node: HTMLElement) {
        const contentWrappers = [...node.children] as HTMLElement[];
        const tabButtons = contentWrappers.map(buildTabButtons);
        tabButtons.forEach( function(tabButton){
            body.insertBefore(tabButton, node);
        })   
    }

    asTabs(document.querySelector<HTMLElement>("tab-panel")!);
});