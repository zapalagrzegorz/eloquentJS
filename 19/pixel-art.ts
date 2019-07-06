function elt(type: string, props?: object | null, ...children: any) {
  const dom = document.createElement(type);
  if (props) Object.assign(dom, props);
  for (const child of children) {
    if (typeof child !== 'string') dom.appendChild(child);
    else dom.appendChild(document.createTextNode(child));
  }
  return dom;
}



function drawPicture(picture: Picture, canvas: HTMLCanvasElement, scale: number) {
  canvas.width = picture.width * scale;
  canvas.height = picture.height * scale;
  const cx = canvas.getContext('2d')!;

  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      cx.fillStyle = picture.pixel(x, y);
      cx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
}

PictureCanvas.prototype.mouse = function (downEvent: MouseEvent, onDown: any) {
  if (downEvent.button != 0) return;
  let pos = pointerPosition(downEvent, this.dom);
  const onMove = onDown(pos);
  if (!onMove) return;
  const move = (moveEvent: MouseEvent) => {
    if (moveEvent.buttons == 0) {
      this.dom.removeEventListener('mousemove', move);
    } else {
      const newPos = pointerPosition(moveEvent, this.dom);
      if (newPos.x == pos.x && newPos.y == pos.y) return;
      pos = newPos;
      onMove(newPos);
    }
  };
  this.dom.addEventListener('mousemove', move);
};

function pointerPosition(pos: MouseEvent | Touch, domNode: HTMLElement) {
  const rect = domNode.getBoundingClientRect();
  return {
    x: Math.floor((pos.clientX - rect.left) / scale),
    y: Math.floor((pos.clientY - rect.top) / scale),
  };
}

PictureCanvas.prototype.touch = function (startEvent: TouchEvent, onDown: any) {
  let pos = pointerPosition(startEvent.touches[0], this.dom);
  const onMove = onDown(pos);
  startEvent.preventDefault();
  if (!onMove) return;

  const move = (moveEvent: TouchEvent) => {
    const newPos = pointerPosition(moveEvent.touches[0], this.dom);
    if (newPos.x == pos.x && newPos.y == pos.y) return;
    pos = newPos;
    onMove(newPos);
  };
  const end = () => {
    this.dom.removeEventListener('touchmove', move);
    this.dom.removeEventListener('touchend', end);
  };

  this.dom.addEventListener('touchmove', move);
  this.dom.addEventListener('touchend', end);
};



interface ToolSelectConstructorObject {
  tools: any;
  dispatch: any;
}

class ToolSelect {
  state: any;

  select: any;

  dom: any;

  constructor(state: any, { tools, dispatch }: ToolSelectConstructorObject) {
    this.select = elt(
      'select',
      {
        onchange: () => dispatch({ tool: this.select.value }),
      },
      ...Object.keys(tools).map(name => elt(
        'option',
        {
          selected: name == state.tool,
        },
        name,
      )),
    );
    this.dom = elt('label', null, '🖌 Tool: ', this.select);
  }

  syncState(state: any) {
    this.select.value = state.tool;
  }
}

interface colorSelectConstructorObject {
  dispatch: any;
}



interface Point {
  x: number;
  y: number;
}

function draw(pos: any, state: any, dispatch: any) {
  function drawPixel({ x, y }: Point, state: any) {
    const drawn = { x, y, color: state.color };
    dispatch({ picture: state.picture.draw([drawn]) });
  }

  drawPixel(pos, state);
  return drawPixel;
}

function rectangle(start: any, state: any, dispatch: any) {
  function drawRectangle(pos: any) {
    const xStart = Math.min(start.x, pos.x);
    const yStart = Math.min(start.y, pos.y);
    const xEnd = Math.max(start.x, pos.x);
    const yEnd = Math.max(start.y, pos.y);
    const drawn = [];
    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        drawn.push({ x, y, color: state.color });
      }
    }
    dispatch({ picture: state.picture.draw(drawn) });
  }
  drawRectangle(start);
  return drawRectangle;
}

const around = [{ dx: -1, dy: 0 }, { dx: 1, dy: 0 }, { dx: 0, dy: -1 }, { dx: 0, dy: 1 }];

function fill({ x, y }: any, state: any, dispatch: any) {
  const targetColor = state.picture.pixel(x, y);
  const drawn = [{ x, y, color: state.color }];
  for (let done = 0; done < drawn.length; done++) {
    for (const { dx, dy } of around) {
      const x = drawn[done].x + dx;
      const y = drawn[done].y + dy;
      if (
        x >= 0
        && x < state.picture.width
        && y >= 0
        && y < state.picture.height
        && state.picture.pixel(x, y) == targetColor
        && !drawn.some(p => p.x == x && p.y == y)
      ) {
        drawn.push({ x, y, color: state.color });
      }
    }
  }
  dispatch({ picture: state.picture.draw(drawn) });
}

function pick(pos: any, state: any, dispatch: any) {
  dispatch({ color: state.picture.pixel(pos.x, pos.y) });
}

class SaveButton {
  picture: Picture;

  dom: HTMLElement;

  constructor(state: any) {
    this.picture = state.picture;
    this.dom = elt(
      'button',
      {
        onclick: () => this.save(),
      },
      '💾 Save',
    );
  }

  save() {
    const canvas = elt('canvas');
    drawPicture(this.picture, canvas as HTMLCanvasElement, 1);

    const link = elt('a', {
      href: (canvas as HTMLCanvasElement).toDataURL(),
      download: 'pixelart.png',
    });

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  syncState(state: any) {
    this.picture = state.picture;
  }
}

class LoadButton {
  dom: HTMLElement;

  constructor(_: any, { dispatch }: any) {
    this.dom = elt(
      'button',
      {
        onclick: () => startLoad(dispatch),
      },
      '📁 Load',
    );
  }

  syncState() {}
}

function startLoad(dispatch: any) {
  const input = elt('input', {
    type: 'file',
    onchange: () => finishLoad((input as HTMLInputElement).files![0], dispatch),
  });
  document.body.appendChild(input);
  input.click();
  input.remove();
}

function finishLoad(file: File, dispatch: any) {
  if (file == null) return;
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const image = elt('img', {
      onload: () => dispatch({
        picture: pictureFromImage(image),
      }),
      src: reader.result,
    });
  });
  reader.readAsDataURL(file);
}

function pictureFromImage(image: any) {
  const width = Math.min(100, image.width);
  const height = Math.min(100, image.height);
  const canvas = elt('canvas', { width, height });
  const cx = (canvas as HTMLCanvasElement).getContext('2d')!;
  cx.drawImage(image, 0, 0);
  const pixels = [];
  const { data } = cx.getImageData(0, 0, width, height);

  function hex(n: any) {
    return n.toString(16).padStart(2, '0');
  }
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = data.slice(i, i + 3);
    pixels.push(`#${hex(r)}${hex(g)}${hex(b)}`);
  }
  return new Picture(width, height, pixels);
}


class UndoButton {
  state: any;

  dom: HTMLElement;

  constructor(state: any, { dispatch }: any) {
    this.dom = elt(
      'button',
      {
        onclick: () => dispatch({ undo: true }),
        disabled: state.done.length == 0,
      },
      '⮪ Undo',
    );
  }

  syncState(state: any) {
    (this.dom as HTMLButtonElement).disabled = state.done.length == 0;
  }
}

const startState = {
  tool: 'draw',
  color: '#000000',
  picture: Picture.empty(60, 30, '#f0f0f0'),
  done: [],
  doneAt: 0,
};

const baseTools = {
  draw, fill, rectangle, pick,
};

const baseControls = [ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton];

function startPixelEditor({ state = startState, tools = baseTools, controls = baseControls }) {
  const app = new PixelEditor(state, {
    tools,
    controls,
    dispatch(action : any) {
      state = historyUpdateState(state, action);
      app.syncState(state);
    },
  });
  return app.dom;
}

document.querySelector('div')!.appendChild(startPixelEditor({}));