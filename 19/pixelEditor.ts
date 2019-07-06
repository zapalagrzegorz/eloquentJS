interface PixelEditorState {
  picture: Picture;
  tool: string;
  color: string;
  done: Array<any>;
  doneAt: number;
}

class PixelEditor {
  state: PixelEditorState;

  canvas: PictureCanvas;

  controls: any;

  dom: HTMLElement;

  //   config to obiekt z prop dispatch |*która jest funkcją
  constructor(state: any, config: any) {
    const { tools, controls, dispatch } = config;
    this.state = state;

    this.canvas = new PictureCanvas(state.picture, (pos: any) => {
      const tool = tools[this.state.tool];
      const onMove = tool(pos, this.state, dispatch);
      if (onMove) return (pos: any) => onMove(pos, this.state);
    });

    /* mapuje po obiektach klas, np. ToolSelect, ColorSelect
     i je po kolei wywołuje korzystając z konstruktora */
    this.controls = controls.map((Control: any) => new Control(state, config));
    this.dom = elt(
      'div',
      {},
      this.canvas.dom,
      elt('br'),
      ...this.controls.reduce((a: any, c: any) => a.concat(' ', c.dom), []),
    );
  }

  syncState(state: any) {
    this.state = state;
    this.canvas.syncState(state.picture);
    for (const ctrl of this.controls) ctrl.syncState(state);
  }
}
