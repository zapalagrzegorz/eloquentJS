/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* globals window */
/* eslint-disable no-restricted-syntax */
window.addEventListener('DOMContentLoaded', () => {
  console.log('test');

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
      return this.actors.find(a => a.type === 'player');
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
    static get type() {
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
    static get type() {
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

    static get type() {
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

  const simpleLevel = new Level(simpleLevelPlan);
  console.log(`${simpleLevel.width} by ${simpleLevel.height}`);
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

    const { player } = newState;
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
});
