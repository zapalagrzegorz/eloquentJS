// Fill in the regular expressions

/* 
car and cat

pop and prop

ferret, ferry, and ferrari

Any word ending in ious

A whitespace character followed by a period, comma, colon, or semicolon

A word longer than six letters

A word without the letter e (or E) */
verify(/ca(r|t)/,
    ["my car", "bad cats"],
    ["camper", "high art"]);

verify(/.../,
    ["pop culture", "mad props"],
    ["plop", "prrrop"]);

verify(/.../,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]);

verify(/.../,
    ["how delicious", "spacious room"],
    ["ruinous", "consciousness"]);

verify(/.../,
    ["bad punctuation ."],
    ["escape the period"]);

verify(/.../,
    ["hottentottententen"],
    ["no", "hotten totten tenten"]);

verify(/\b[^\We]+\b/,
    ["red platypus", "wobbling nest"],
    ["earth bed", "learning ape", "BEET"]);

interface iVerify {
    
}

function verify(regexp : RegExp, yes : Array<string>, no : Array<string>) : void {
    // Ignore unfinished exercises
    if (regexp.source == "...") return;
    for (let str of yes) if (!regexp.test(str)) {
        console.log(`Failure to match '${str}'`);
    }
    for (let str of no) if (regexp.test(str)) {
        console.log(`Unexpected match for '${str}'`);
    }
}
