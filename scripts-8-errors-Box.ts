// Zamknięte pudełko
// Spójrz na poniższy wydumany obiekt:

interface Ibox {
    locked: boolean,
    unlock(): void,
    lock(): void,
    _content: Array<any>,
    content: Array<any> | never;

}

interface IsideEffect {
    () : Array<any> | never 
}

const box: Ibox = {
    locked: false,
    unlock: function () { this.locked = false; },
    lock: function () { this.locked = true; },
    _content: ['success'],
    get content() {
        if (this.locked) throw new Error("Zamknięte!");
        return this._content;
    }
};
// Jest to pudełko z zamkiem.Wewnątrz znajduje się tablica, ale można się
// do niej dostać tylko po otwarciu pudełka.Bezpośredni dostęp do własności
// _content jest zabroniony.
// Napisz funkcję o nazwie withBoxUnlocked przyjmującą jako argument
// wartość funkcyjną, otwierającą pudełko, wykonującą tę funkcję i zamykającą
// pudełko przed zwróceniem wartości bez względu na to, czy funkcja przekazana
// w argumencie zakończyła działanie normalnie, czy zgłosiła wyjątek.

function withBoxUnlocked(body: IsideEffect) : Array<any> | never {
    if (!box.locked) {
        return body();
    }

    box.unlock();
    try {   
       return body();
    }
    finally {
        box.lock();
    }
}

// console.log(withBoxUnlocked(box.unlock));


console.log(withBoxUnlocked( function () {
    box.content.push("gold piece");
    return box.content;
}));

// console.log(test());

// try {
//     withBoxUnlocked(function () {
//         throw new Error("Pirates on the horizon! Abort!");
//     });
// } catch (e) {
//     console.log("Error raised:", e);
// }

console.log(box.locked);
  // → true