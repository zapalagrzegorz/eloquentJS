// Groups
// The standard JavaScript environment provides another data structure called Set. Like an instance of Map, a set holds a collection of values. Unlike Map, it does not associate other values with those—it just tracks which values are part of the set. A value can be part of a set only once—adding it again doesn’t have any effect.

// Write a class called Group (since Set is already taken). Like Set, it has add, delete, and has methods. Its constructor creates an empty group, add adds a value to the group (but only if it isn’t already a member), delete removes its argument from the group (if it was a member), and has returns a Boolean value indicating whether its argument is a member of the group.

// Use the === operator, or something equivalent such as indexOf, to determine whether two values are the same.

// Give the class a static from method that takes an iterable object as argument and creates a group that contains all the values produced by iterating over it.

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
            let group = [];
            for (const value of iterable) {
                this.add(value)
            }
            return group;
        }

        return new Group(setGroup())
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
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true


// HERE
console.log(group.has(30));
// → false

group.add(10);
group.delete(10);
console.log(group.has(10));
// false

// Borrowing a method

// Earlier in the chapter I mentioned that an object’s hasOwnProperty can be used as a more robust alternative to the in operator when you want to ignore the prototype’s properties. But what if your map needs to include the word "hasOwnProperty"? You won’t be able to call that method anymore because the object’s own property hides the method value.

// Can you think of a way to call hasOwnProperty on an object that has its own property by that name?

let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
// console.log(map.hasOwnProperty("one"));
console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// → true