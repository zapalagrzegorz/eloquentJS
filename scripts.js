/* eslint-disable no-console */
window.addEventListener('DOMContentLoaded', function () {
    console.log('test');

    let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

    class Level {
        constructor (plan) {
            let rows = plan
                .trim()
                // split da nam tablicę 9 elementową, po rzędzie
                .split('\n')
                // each line (array) is spread into an array, producing arrays of characters.
                .map(element => [...element]);

            // let rows = rowstemp.map(element => {
            //     return [...element];
            //     // return [tempString];
            // });
            // let rows = rowstemp.map(element => [...element]);

            this.height = rows.length;
            this.width = rows[0].length;
            this.startActors = [];

            this.rows = rows.map((row, y) => {
                return row.map((ch, x) => {
                    // let type = levelChars[ch];
                    // if (typeof type === 'string') return type;
                    // this.startActors.push(type.create(new Vec(x, y), ch));
                    return 'empty';
                });
            });
        }
    }
    new Level(simpleLevelPlan);
});
