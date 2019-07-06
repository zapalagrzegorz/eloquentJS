class ColorSelect {
    state: any;
    input: HTMLElement;
    private dom: HTMLElement;
  
    constructor(state: any, { dispatch }: colorSelectConstructorObject) {
      this.input = elt('input', {
        type: 'color',
        value: state.color,
        onchange: () => dispatch({ color: (this.input as HTMLInputElement).value }),
      });
      this.dom = elt('label', null, '🎨 Color: ', this.input);
    }
  
    syncState(state: any) {
      (this.input as HTMLInputElement).value = state.color;
    }
  }

//   dispatch(action : any) {
//     state = historyUpdateState(state, action);
//     app.syncState(state);
//   },