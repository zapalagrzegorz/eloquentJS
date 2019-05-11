// Make the Group class from the previous exercise iterable. Refer to the section about the iterator interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.

// If you used an array to represent the group’s members, don’t just return the iterator created by calling the Symbol.iterator method on the array. That would work, but it defeats the purpose of this exercise.

// It is okay if your iterator behaves strangely when the group is modified during iteration.

// // Your code here (and the code from the previous exercise)



class Group {
    // Your code here.
    constructor(array = []) {
        this.values = array;
    }


    static from(iterable) {

        if (iterable[Symbol.iterator] === undefined) {
            throw Error(`${iterable} is not iterable`);
        }

        const setGroup = () => {
            let group = new Group;
            for (const value of iterable) {
                group.add(value)
            }
            return group;
        }

        return setGroup();
    }

    has(value) {
        return this.values.includes(value);
    }

    add(value) {
        if (!this.has(value)) {
            this.values.push(value);
        }
    }

    delete(value) {
        if (this.has(value)) {
            const filtered = this.values.filter((item) => item !== value ? true : false);
            this.values = filtered;
        }
    }

    [Symbol.iterator]() {
        return new GroupIterator(this);
    };
}

class GroupIterator {
    constructor(group) {

        this.index = 0;
        this.groupMembers = group.values;
    }

    next() {

        if (this.index == this.groupMembers.length) {
            return {
                done: true
            }
        };

        let value = {
            value: this.groupMembers[this.index]
        };

        this.index++;

        return {
            value,
            done: false
        };
    }
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}
// // → a
// // → b
// // → c


// third element in the fifth row is (using zero-based indexing) stored at position 4 × width + 2.

// class Matrix {
//     constructor(width, height, element = (x, y) => undefined) {
//         this.width = width;
//         this.height = height;
//         this.content = [];

//         // the third element in the fifth row is (using zero-based indexing) stored at position 4 × width + 2.
//         for (let y = 0; y < height; y++) {
//             for (let x = 0; x < width; x++) {
//                 this.content[y * width + x] = element(x, y);
//             }
//         }
//     }

//     get(x, y) {
//         return this.content[y * this.width + x];
//     }
//     set(x, y, value) {
//         this.content[y * this.width + x] = value;
//     }

//     [Symbol.iterator] = function () {
//         return new MatrixIterator(this);
//     };

// }



// let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
// for (let {
//         x,
//         y,
//         value
//     } of matrix) {
//     console.log(x, y, value);
// }