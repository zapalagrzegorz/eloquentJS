"use strict";
class ColorSelect {
    constructor(state, { dispatch }) {
        this.input = elt('input', {
            type: 'color',
            value: state.color,
            onchange: () => dispatch({ color: this.input.value }),
        });
        this.dom = elt('label', null, '🎨 Color: ', this.input);
    }
    syncState(state) {
        this.input.value = state.color;
    }
}
//   dispatch(action : any) {
//     state = historyUpdateState(state, action);
//     app.syncState(state);
//   },
