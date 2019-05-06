/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* globals window */
/* eslint-disable no-restricted-syntax */
window.addEventListener('DOMContentLoaded', () => {
  const GAME_LEVELS = [
    `                                                    
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
..................................................................###...........
...................................................##......##....##+##..........
....................................o.o......##..................#+++#..........
.................................................................##+##..........
...................................#####..........................#v#...........
............................................................................##..
..##......................................o.o................................#..
..#.....................o....................................................#..
..#......................................#####.............................o.#..
..#..........####.......o....................................................#..
..#..@.......#..#................................................#####.......#..
..############..###############...####################.....#######...#########..
..............................#...#..................#.....#....................
..............................#+++#..................#+++++#....................
..............................#+++#..................#+++++#....................
..............................#####..................#######....................
................................................................................
................................................................................
`,
    `                                                                     
................................................................................
................................................................................
....###############################.............................................
...##.............................##########################################....
...#.......................................................................##...
...#....o...................................................................#...
...#................................................=.......................#...
...#.o........################...................o..o...........|........o..#...
...#.........................#..............................................#...
...#....o....................##########.....###################....##########...
...#..................................#+++++#.................#....#............
...###############....oo......=o.o.o..#######.###############.#....#............
.....#...............o..o.............#.......#......#........#....#............
.....#....................#############..######.####.#.########....########.....
.....#.............########..............#...........#.#..................#.....
.....#..........####......####...#####################.#..................#.....
.....#........###............###.......................########....########.....
.....#.......##................#########################......#....#............
.....#.......#................................................#....#............
.....###......................................................#....#............
.......#...............o...........................................#............
.......#...............................................o...........#............
.......#########......###.....############.........................##...........
.............#..................#........#####....#######.o.........########....
.............#++++++++++++++++++#............#....#.....#..................#....
.............#++++++++++++++++++#..........###....###...####.o.............#....
.............####################..........#........#......#.....|.........#....
...........................................#++++++++#......####............#....
...........................................#++++++++#.........#........@...#....
...........................................#++++++++#.........##############....
...........................................##########...........................
................................................................................
`,
    `
......................................#++#........................#######....................................#+#..
......................................#++#.....................####.....####.................................#+#..
......................................#++##########...........##...........##................................#+#..
......................................##++++++++++##.........##.............##...............................#+#..
.......................................##########++#.........#....................................o...o...o..#+#..
................................................##+#.........#.....o...o....................................##+#..
.................................................#+#.........#................................###############++#..
.................................................#v#.........#.....#...#........................++++++++++++++##..
.............................................................##..|...|...|..##............#####################...
..............................................................##+++++++++++##............v........................
...............................................................####+++++####......................................
...............................................#.....#............#######........###.........###..................
...............................................#.....#...........................#.#.........#.#..................
...............................................#.....#.............................#.........#....................
...............................................#.....#.............................##........#....................
...............................................##....#.............................#.........#....................
...............................................#.....#......o..o.....#...#.........#.........#....................
...............#######........###...###........#.....#...............#...#.........#.........#....................
..............##.....##.........#...#..........#.....#.....######....#...#...#########.......#....................
.............##.......##........#.o.#..........#....##...............#...#...#...............#....................
.....@.......#.........#........#...#..........#.....#...............#...#...#...............#....................
....###......#.........#........#...#..........#.....#...............#...#####...######......#....................
....#.#......#.........#.......##.o.##.........#.....#...............#.....o.....#.#.........#....................
++++#.#++++++#.........#++++++##.....##++++++++##....#++++++++++.....#.....=.....#.#.........#....................
++++#.#++++++#.........#+++++##.......##########.....#+++++++##+.....#############.##..o.o..##....................
++++#.#++++++#.........#+++++#....o.................##++++++##.+....................##.....##.....................
++++#.#++++++#.........#+++++#.....................##++++++##..+.....................#######......................
++++#.#++++++#.........#+++++##.......##############++++++##...+..................................................
++++#.#++++++#.........#++++++#########++++++++++++++++++##....+..................................................
++++#.#++++++#.........#++++++++++++++++++++++++++++++++##.....+..................................................
`,
    `
..............................................................................................................
..............................................................................................................
..............................................................................................................
..............................................................................................................
..............................................................................................................
........................................o.....................................................................
..............................................................................................................
........................................#.....................................................................
........................................#.....................................................................
........................................#.....................................................................
........................................#.....................................................................
.......................................###....................................................................
.......................................#.#.................+++........+++..###................................
.......................................#.#.................+#+........+#+.....................................
.....................................###.###................#..........#......................................
......................................#...#.................#...oooo...#.......###............................
......................................#...#.................#..........#......#+++#...........................
......................................#...#.................############.......###............................
.....................................##...##......#...#......#................................................
......................................#...#########...########..............#.#...............................
......................................#...#...........#....................#+++#..............................
......................................#...#...........#.....................###...............................
.....................................##...##..........#.......................................................
......................................#...#=.=.=.=....#............###........................................
......................................#...#...........#...........#+++#.......................................
......................................#...#....=.=.=.=#.....o......###.......###..............................
.....................................##...##..........#.....................#+++#.............................
..............................o...o...#...#...........#.....#................##v........###...................
......................................#...#...........#..............#.................#+++#..................
.............................###.###.###.###.....o.o..#++++++++++++++#...................v#...................
.............................#.###.#.#.###.#..........#++++++++++++++#........................................
.............................#.............#...#######################........................................
.............................##...........##.........................................###......................
..###.........................#.....#.....#.........................................#+++#................###..
..#.#.........................#....###....#..........................................###.................#.#..
..#...........................#....###....#######........................#####.............................#..
..#...........................#...........#..............................#...#.............................#..
..#...........................##..........#..............................#.#.#.............................#..
..#.......................................#.......|####|....|####|.....###.###.............................#..
..#................###.............o.o....#..............................#.........###.....................#..
..#...............#####.......##..........#.............................###.......#+++#..........#.........#..
..#...............o###o.......#....###....#.............................#.#........###..........###........#..
..#................###........#############..#.oo.#....#.oo.#....#.oo..##.##....................###........#..
..#......@..........#.........#...........#++#....#++++#....#++++#....##...##....................#.........#..
..#############################...........#############################.....################################..
..............................................................................................................
..............................................................................................................
`,
    `
..................................................................................................###.#.......
......................................................................................................#.......
..................................................................................................#####.......
..................................................................................................#...........
..................................................................................................#.###.......
..........................o.......................................................................#.#.#.......
.............................................................................................o.o.o###.#.......
...................###................................................................................#.......
.......+..o..+................................................#####.#####.#####.#####.#####.#####.#####.......
.......#.....#................................................#...#.#...#.#...#.#...#.#...#.#...#.#...........
.......#=.o..#............#...................................###.#.###.#.###.#.###.#.###.#.###.#.#####.......
.......#.....#..................................................#.#...#.#...#.#...#.#...#.#...#.#.....#.......
.......+..o..+............o..................................####.#####.#####.#####.#####.#####.#######.......
..............................................................................................................
..........o..............###..............................##..................................................
..............................................................................................................
..............................................................................................................
......................................................##......................................................
...................###.........###............................................................................
..............................................................................................................
..........................o.....................................................#......#......................
..........................................................##.....##...........................................
.............###.........###.........###.................................#..................#.................
..............................................................................................................
.................................................................||...........................................
..###########.................................................................................................
..#.........#.o.#########.o.#########.o.##................................................#...................
..#.........#...#.......#...#.......#...#.................||..................#.....#.........................
..#..@......#####...o...#####...o...#####.....................................................................
..#######.....................................#####.......##.....##.....###...................................
........#=..................=................=#...#.....................###...................................
........#######################################...#+++++++++++++++++++++###+++++++++++++++++++++++++++++++++++
..................................................############################################################
..............................................................................................................
`,
  ];

  /**  */
  class Vec {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    /**
     *
     * @param {Vec} other
     * @returns Vec
     */
    plus(other) {
      return new Vec(this.x + other.x, this.y + other.y);
    }

    /**
     *
     * @param {number} factor
     * @returns Vec
     */
    times(factor) {
      return new Vec(this.x * factor, this.y * factor);
    }
  }

  const simpleLevelPlan = `......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

  /**
   * @constructor
   */
  class State {
    constructor(level, actors, status) {
      this.level = level;
      this.actors = actors;
      this.status = status;
    }

    /**
     *
     * @param {Level} level
     */
    static start(level) {
      return new State(level, level.startActors, 'playing');
    }

    get player() {
      const player = this.actors.find(a => a.type === 'player');
      return player;
    }
  }

  /**

   */
  class Player {
    /**
     * @constructor
     * @param {Vec} pos
     * @param {Vec} speed
     */
    constructor(pos, speed) {
      this.pos = pos;
      this.speed = speed;
    }

    /**
     *
     */
    // eslint-disable-next-line
    get type() {
      return 'player';
    }

    /**
     *
     * @param {Vec} pos
     */
    static create(pos) {
      return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
    }
  }

  Player.prototype.size = new Vec(0.8, 1.5);

  class Lava {
    /**
     *
     * @param {Vec} pos
     * @param {Vec} speed
     * @param {Vec} reset
     */
    constructor(pos, speed, reset) {
      this.pos = pos;
      this.speed = speed;
      this.reset = reset;
    }

    /**
     *
     */
    get type() {
      return 'lava';
    }

    /**
     *
     * @param {Vec} pos
     * @param {string} ch
     */
    static create(pos, ch) {
      if (ch === '=') {
        return new Lava(pos, new Vec(2, 0));
      }
      if (ch === '|') {
        return new Lava(pos, new Vec(0, 2));
      }
      if (ch === 'v') {
        return new Lava(pos, new Vec(0, 3), pos);
      }

      throw new Error('e');
    }
  }

  Lava.prototype.size = new Vec(1, 1);

  class Coin {
    /**
     *
     * @param {Vec} pos
     * @param {Vec} basePos
     * @param {*} wobble
     */
    constructor(pos, basePos, wobble) {
      this.pos = pos;
      this.basePos = basePos;
      this.wobble = wobble;
    }

    get type() {
      return 'coin';
    }

    static create(pos) {
      const basePos = pos.plus(new Vec(0.2, 0.1));
      return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
    }
  }

  Coin.prototype.size = new Vec(0.6, 0.6);

  const levelChars = {
    '.': 'empty',
    '#': 'wall',
    '+': 'lava',
    '@': Player,
    o: Coin,
    '=': Lava,
    '|': Lava,
    v: Lava,
  };
  /**
   *
   */
  class Level {
    constructor(plan) {
      const rows = plan
        .trim()
        .split('\n')
        // each line is spread into an array, producing arrays of characters.
        .map(l => [...l]);
      this.height = rows.length;
      this.width = rows[0].length;
      this.startActors = [];

      // zampować tablicę wymiarową
      // lista [], zawiera listę rzedów [], które są zawierają kolejne rzędy
      // lista [
      //    [ [a], [b], [c], [d] ],
      //    [ a1], [a2], [a3], [a4] ],
      //    ...]
      this.rows = rows.map((row, y) => row.map((ch, x) => {
        const type = levelChars[ch];
        if (typeof type === 'string') return type;
        this.startActors.push(type.create(new Vec(x, y), ch));
        return 'empty';
      }));
    }
  }

  // const simpleLevel = new Level(simpleLevelPlan);
  // console.log(`${simpleLevel.width} by ${simpleLevel.height}`);
  // → 22 by 9

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

  const scale = 20;
  function drawGrid(level) {
    return elt(
      'table',
      {
        class: 'background',
        style: `width: ${level.width * scale}px`,
      },
      ...level.rows.map(row => elt('tr', { style: `height: ${scale}px` }, ...row.map(type => elt('td', { class: type })))),
    );
  }
  class DOMDisplay {
    constructor(parent, level) {
      this.dom = elt('div', { class: 'game' }, drawGrid(level));
      this.actorLayer = null;
      parent.appendChild(this.dom);
    }

    clear() {
      this.dom.remove();
    }
  }

  function drawActors(actors) {
    return elt(
      'div',
      {},
      ...actors.map((actor) => {
        const rect = elt('div', { class: `actor ${actor.type}` });
        rect.style.width = `${actor.size.x * scale}px`;
        rect.style.height = `${actor.size.y * scale}px`;
        rect.style.left = `${actor.pos.x * scale}px`;
        rect.style.top = `${actor.pos.y * scale}px`;
        return rect;
      }),
    );
  }

  DOMDisplay.prototype.syncState = function syncState(state) {
    if (this.actorLayer) this.actorLayer.remove();
    this.actorLayer = drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
  };

  DOMDisplay.prototype.scrollPlayerIntoView = function scrollPlayerIntoView(state) {
    const width = this.dom.clientWidth;
    const height = this.dom.clientHeight;
    const margin = width / 3;
    // The viewport
    const left = this.dom.scrollLeft;
    const right = left + width;
    const top = this.dom.scrollTop;
    const bottom = top + height;
    const { player } = state;
    const center = player.pos.plus(player.size.times(0.5)).times(scale);
    if (center.x < left + margin) {
      this.dom.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
      this.dom.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
      this.dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      this.dom.scrollTop = center.y + margin - height;
    }
  };

  /**
   *
   */
  Level.prototype.touches = function touches(pos, size, type) {
    const xStart = Math.floor(pos.x);
    const xEnd = Math.ceil(pos.x + size.x);
    const yStart = Math.floor(pos.y);
    const yEnd = Math.ceil(pos.y + size.y);

    for (let y = yStart; y < yEnd; y += 1) {
      for (let x = xStart; x < xEnd; x += 1) {
        const isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
        const here = isOutside ? 'wall' : this.rows[y][x];
        if (here === type) return true;
      }
    }
    return false;
  };

  /**
   *
   * @param {Coin | Player | Lava} actor1
   * @param {Coin | Player | Lava} actor2
   */
  function overlap(actor1, actor2) {
    return (
      actor1.pos.x + actor1.size.x > actor2.pos.x
      && actor1.pos.x < actor2.pos.x + actor2.size.x
      && actor1.pos.y + actor1.size.y > actor2.pos.y
      && actor1.pos.y < actor2.pos.y + actor2.size.y
    );
  }

  /**
   *
   */
  State.prototype.update = function update(time, keys) {
    const actors = this.actors.map(actor => actor.update(time, this, keys));
    let newState = new State(this.level, actors, this.status);

    if (newState.status !== 'playing') return newState;

    // eslint-disable-next-line
    const player = newState.player;
    if (this.level.touches(player.pos, player.size, 'lava')) {
      return new State(this.level, actors, 'lost');
    }

    for (const actor of actors) {
      if (actor !== player && overlap(actor, player)) {
        newState = actor.collide(newState);
      }
    }
    return newState;
  };

  Lava.prototype.collide = function collide(state) {
    return new State(state.level, state.actors, 'lost');
  };

  Coin.prototype.collide = function collide(state) {
    const filtered = state.actors.filter(a => a !== this);
    let { status } = state;
    // jeśli nie ma żadnego elementu spełniajacego warunek
    if (!filtered.some(a => a.type === 'coin')) status = 'won';
    return new State(state.level, filtered, status);
  };

  Lava.prototype.update = function update(time, state) {
    const newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, 'wall')) {
      return new Lava(newPos, this.speed, this.reset);
    }
    if (this.reset) {
      return new Lava(this.reset, this.speed, this.reset);
    }
    return new Lava(this.pos, this.speed.times(-1));
  };

  const wobbleSpeed = 8;
  const wobbleDist = 0.07;

  Coin.prototype.update = function update(time) {
    const wobble = this.wobble + time * wobbleSpeed;
    const wobblePos = Math.sin(wobble) * wobbleDist;
    return new Coin(this.basePos.plus(new Vec(0, wobblePos)), this.basePos, wobble);
  };

  const playerXSpeed = 7;
  const gravity = 30;
  const jumpSpeed = 17;

  Player.prototype.update = function update(time, state, keys) {
    let xSpeed = 0;
    if (keys.ArrowLeft) xSpeed -= playerXSpeed;
    if (keys.ArrowRight) xSpeed += playerXSpeed;
    let { pos } = this;
    const movedX = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, 'wall')) {
      pos = movedX;
    }

    let ySpeed = this.speed.y + time * gravity;
    const movedY = pos.plus(new Vec(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, 'wall')) {
      pos = movedY;
    } else if (keys.ArrowUp && ySpeed > 0) {
      ySpeed = -jumpSpeed;
    } else {
      ySpeed = 0;
    }
    return new Player(pos, new Vec(xSpeed, ySpeed));
  };

  // Tracking keys
  function trackKeys(keys) {
    const down = Object.create(null);
    function track(event) {
      if (keys.includes(event.key)) {
        down[event.key] = event.type === 'keydown';
        event.preventDefault();
      }
    }
    window.addEventListener('keydown', track);
    window.addEventListener('keyup', track);
    return down;
  }

  const arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp']);

  // Running the game
  function runAnimation(frameFunc) {
    let lastTime = null;
    function frame(time) {
      if (lastTime != null) {
        // I have set a maximum frame step of 100 milliseconds (one-tenth of a second). When the browser tab or window with our page is hidden, requestAnimationFrame calls will be suspended until the tab or window is shown again. In this case, the difference between lastTime and time will be the entire time in which the page was hidden.
        const timeStep = Math.min(time - lastTime, 100) / 1000;
        if (frameFunc(timeStep) === false) return;
      }
      lastTime = time;
      requestAnimationFrame(frame);
    }
    // Wywoływanej funkcji callvack (tu: frame) przekazywany jest pojedynczy argument DOMHighResTimeStamp, który zawiera aktualny czas rozpoczęcia wykonywania tej funkcji, wstawionej do kolejki przez wywołanie requestAnimationFrame
    window.requestAnimationFrame(frame);
  }

  function runLevel(level, Display) {
    const display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    return new Promise((resolve) => {
      runAnimation((time) => {
        state = state.update(time, arrowKeys);
        display.syncState(state);
        if (state.status === 'playing') {
          return true;
        }
        if (ending > 0) {
          ending -= time;
          return true;
        }
        display.clear();
        resolve(state.status);
        return false;
      });
    });
  }

  async function runGame(plans, Display) {
    for (let level = 0; level < plans.length;) {
      const status = await runLevel(new Level(plans[level]), Display);
      if (status === 'won') level += 1;
    }
    console.log("You've won!");
  }

  class CanvasDisplay {
    constructor(parent, level) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = Math.min(600, level.width * scale);
      this.canvas.height = Math.min(450, level.height * scale);
      parent.appendChild(this.canvas);
      this.cx = this.canvas.getContext('2d');

      this.flipPlayer = false;

      this.viewport = {
        left: 0,
        top: 0,
        width: this.canvas.width / scale,
        height: this.canvas.height / scale,
      };
    }

    clear() {
      this.canvas.remove();
    }
  }

  CanvasDisplay.prototype.syncState = function sync(state) {
    this.updateViewport(state);
    this.clearDisplay(state.status);
    this.drawBackground(state.level);
    this.drawActors(state.actors);

    this.log = function log() {
      console.log('testing property');
    };
  };

  CanvasDisplay.prototype.updateViewport = function update(state) {
    const view = this.viewport;
    const margin = view.width / 3;
    const { player } = state;
    const center = player.pos.plus(player.size.times(0.5));

    if (center.x < view.left + margin) {
      view.left = Math.max(center.x - margin, 0);
    } else if (center.x > view.left + view.width - margin) {
      view.left = Math.min(center.x + margin - view.width, state.level.width - view.width);
    }
    if (center.y < view.top + margin) {
      view.top = Math.max(center.y - margin, 0);
    } else if (center.y > view.top + view.height - margin) {
      view.top = Math.min(center.y + margin - view.height, state.level.height - view.height);
    }
  };

  CanvasDisplay.prototype.clearDisplay = function clear(status) {
    if (status === 'won') {
      this.cx.fillStyle = 'rgb(68, 191, 255)';
    } else if (status === 'lost') {
      this.cx.fillStyle = 'rgb(44, 136, 214)';
    } else {
      this.cx.fillStyle = 'rgb(52, 166, 251)';
    }
    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  const otherSprites = document.createElement('img');
  otherSprites.src = 'img/sprites_big.png';

  CanvasDisplay.prototype.drawBackground = function draw(level) {
    const {
      left, top, width, height,
    } = this.viewport;
    const xStart = Math.floor(left);
    const xEnd = Math.ceil(left + width);
    const yStart = Math.floor(top);
    const yEnd = Math.ceil(top + height);

    // eslint-disable-next-line no-plusplus
    for (let y = yStart; y < yEnd; y++) {
      // eslint-disable-next-line no-plusplus
      for (let x = xStart; x < xEnd; x++) {
        const tile = level.rows[y][x];
        // eslint-disable-next-line no-continue
        if (tile === 'empty') continue;
        const screenX = (x - left) * scale;
        const screenY = (y - top) * scale;
        const tileX = tile === 'lava' ? scale : 0;
        this.cx.drawImage(otherSprites, tileX, 0, scale, scale, screenX, screenY, scale, scale);
      }
    }
  };

  const playerSprites = document.createElement('img');
  playerSprites.src = 'img/player_big.png';
  const playerXOverlap = 4;

  function flipHorizontally(context, around) {
    context.translate(around, 0);
    context.scale(-1, 1);
    context.translate(-around, 0);
  }

  CanvasDisplay.prototype.drawPlayer = function draw(player, x, y,
    width, height) {
    // eslint-disable-next-line no-param-reassign
    width += playerXOverlap * 2;
    // eslint-disable-next-line no-param-reassign
    x -= playerXOverlap;
    if (player.speed.x !== 0) {
      this.flipPlayer = player.speed.x < 0;
    }

    let tile = 8;
    if (player.speed.y !== 0) {
      tile = 9;
    } else if (player.speed.x !== 0) {
      // tile = Math.floor(Date.now() / 60) % 8;
      tile = Math.floor(Date.now() / 60) % 8;
    }

    this.cx.save();
    if (this.flipPlayer) {
      flipHorizontally(this.cx, x + width / 2);
    }
    const tileX = tile * width;
    this.cx.drawImage(playerSprites, tileX, 0, width, height,
      x, y, width, height);
    this.cx.restore();
  };

  CanvasDisplay.prototype.drawActors = function draw(actors) {
    for (const actor of actors) {
      const width = actor.size.x * scale;
      const height = actor.size.y * scale;
      const x = (actor.pos.x - this.viewport.left) * scale;
      const y = (actor.pos.y - this.viewport.top) * scale;
      if (actor.type === 'player') {
        this.drawPlayer(actor, x, y, width, height);
      } else {
        const tileX = (actor.type === 'coin' ? 2 : 1) * scale;
        this.cx.drawImage(otherSprites,
          tileX, 0, width, height,
          x, y, width, height);
      }
    }
  };

  runGame(GAME_LEVELS, CanvasDisplay);
});
