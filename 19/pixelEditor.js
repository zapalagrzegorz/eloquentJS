"use strict";
class PixelEditor {
    //   config to obiekt z prop dispatch |*która jest funkcją
    constructor(state, config) {
        const { tools, controls, dispatch } = config;
        this.state = state;
        this.canvas = new PictureCanvas(state.picture, (pos) => {
            const tool = tools[this.state.tool];
            const onMove = tool(pos, this.state, dispatch);
            if (onMove)
                return (pos) => onMove(pos, this.state);
        });
        /* mapuje po obiektach klas, np. ToolSelect, ColorSelect
         i je po kolei wywołuje korzystając z konstruktora */
        this.controls = controls.map((Control) => new Control(state, config));
        this.dom = elt('div', {}, this.canvas.dom, elt('br'), ...this.controls.reduce((a, c) => a.concat(' ', c.dom), []));
    }
    syncState(state) {
        this.state = state;
        this.canvas.syncState(state.picture);
        for (const ctrl of this.controls)
            ctrl.syncState(state);
    }
}
