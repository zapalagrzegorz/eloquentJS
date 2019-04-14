/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* globals window */
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

  const simpleLevelPlan = `
        ......................
        ..#................#..
        ..#..............=.#..
        ..#.........o.o....#..
        ..#.@......#####...#..
        ..#####............#..
        ......#++++++++++++#..
        ......##############..
        ......................`;

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

  Level(simpleLevelPlan);
});
