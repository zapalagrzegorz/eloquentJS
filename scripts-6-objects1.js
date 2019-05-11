var protoRabbit = {
    speak: function (line) {
        console.log(this.type + " królik mówi: „" + line + "”");
    }
};

var killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "Zabójczy";
// killerRabbit.speak("ARGHHHH!");
// → Zabójczy królik mówi: „ARGHHHH!”

/* Konstruktor ma własność prototype (Rabbit.prototype). Jest ona prototypem (dla) egzemplarzy utworzonych za jego pomocą,
ale nie prototypem jego samego. */
function Rabbit(type) {
    this.type = type;
}
var killerRabbit = new Rabbit("Zabójczy");
var blackRabbit = new Rabbit("Czarny");
// console.log(blackRabbit.type);

Rabbit.prototype.speak = function (line) {
    console.log(this.type + " królik mówi: „" + line + "”");
};

blackRabbit.speak("Zagłada...");

/** 
 * obiektom z konstruktura nie można nadpisać prototypu.
 * Pole prototype nie jest dostępne w ten sposób, tylko jako ukryte
 *  */ 
// blackRabbit.prototype.speakProtope = function () {
// console.log('speakProtope')
// };

console.log(Object.getPrototypeOf(blackRabbit));

/*  minHeight — zwraca liczbę określającą minimalną wysokość komórki
(w liniach).
 minWidth — zwraca liczbę określającą minimalną szerokość komórki
(w znakach).
 draw(width, height) — zwraca tablicę długości height zawierającą
szereg łańcuchów, z których każdy ma szerokość width znaków.
Reprezentuje ona treść komórki. */


/** 
 * Obliczanie wysokości rzędu 
 * 
 * oblicza minimalną wysokość dla każdego rzędu - 
 * wysokość komórki jest obliczana przez liczbę tablic stworzonych dla każdego
 * tekstu oddzielonego znakiem nowej linii
 * 
 * @returns [] z wysokościami poszczególnych rzędów
 * */

// rows to tablica zawierająca tablice z contentem
function rowHeights(rows) {

    // zmapuj każdą tablicę z kontentem
    return rows.map(function (row) {

        // max - wartość przyrostow - previousValue
        // cell kolejna wartość tablicy - currentValue
        // 0 - initialValue
        // oblicza maksymalną długość tekstu komórki
        return row.reduce(function (max, cell) {
            return Math.max(max, cell.minHeight());
        }, 0);

    });
}

/* Obliczanie szerokości kolumn */
/* Mapując elementy pierwszego wiersza i używając tylko drugiego
argumentu funkcji mapującej, funkcja colWidths buduje tablicę z jednym
elementem dla każdego indeksu kolumnowego. Dla każdego indeksu na
zewnętrznej tablicy rows zostaje wywołana funkcja reduce, która wybiera
szerokość najszerszej komórki pod danym indeksem. */
function colWidths(rows) {
    // zwraca tablicę o długości pierwszego rzędu
    // z jednym elementem dla każdego indeksu kolumnowego 
    return rows[0].map(function (_, i) {

        /* Dla każdego indeksu na zewnętrznej tablicy rows zostaje wywołana funkcja reduce, która wybiera
        szerokość najszerszej komórki pod danym indeksem. */
        return rows.reduce(function (max, row) {
            // row[i] - iterujemy po indeksach kolumnowych
            // iterujemy pionowo po tablicy dwuwymiarowej !!!
            // rząd 0, indeks 0;
            // rzad 1, indeks 0,
            // rząd 2, indeks 0
            // zwraca najwieksza wartość długości dla komórki w indeksie kolumnowym
            return Math.max(max, row[i].minWidth());
        }, 0);
    });
}

/* Funkcja drawTable przy użyciu wewnętrznej funkcji pomocniczej drawRow
rysuje wszystkie wiersze, a następnie łączy je przy użyciu znaków nowego
wiersza. */
function drawTable(rows) {
    var heights = rowHeights(rows);
    var widths = colWidths(rows);

    /* Funkcja drawLine wydobywa z tablicy bloków linie, które powinny znajdować
się obok siebie, i łączy je za pomocą spacji w celu utworzenia jednoznakowej
przerwy między kolumnami tabeli. */
    function drawLine(blocks, lineNo) {
        return blocks.map(function (block) {
            return block[lineNo];
        }).join(" ");
    }

    /* Funkcja drawRow najpierw konwertuje obiekty komórek z wiersza na bloki,
    które są tablicami łańcuchów reprezentujących zawartość komórek podzielonymi
    według wierszy. 
    Pojedyncza komórka zawierająca liczbę 3776 może być
    reprezentowana przez element tablicy ["3776"], natomiast podkreślona
    komórka może zajmować dwa wiersze i być reprezentowana przez tablicę
    ["nazwa", "---"]. */
    function drawRow(row, rowIndex) {
        var blocks = row.map(function (cell, columnIndex) {
            return cell.draw(widths[columnIndex], heights[rowIndex]);
        });

        /* Bloki wiersza, które mają jednakową wysokość, w ostatecznym wyniku
        powinny znajdować się w jednej linii. Drugie wywołanie metody map w metodzie
        drawRow buduje ten wynik linijka po linijce przez mapowanie linii z pierwszego
        bloku z lewej i dla każdego z nich zbieranie linii obejmującej całą szerokość
        tabeli. Linie te są następnie łączone za pomocą znaków nowego wiersza w celu
        utworzenia całego wiersza jako wartości zwrotnej funkcji drawRow. */
        return blocks[0].map(function (_, lineNo) {
            return drawLine(blocks, lineNo);
        }).join("\n");
    }

    return rows.map(drawRow).join("\n");
}




function repeat(string, times) {
    var result = "";
    for (var i = 0; i < times; i++)
        result += string;
    return result;
}

/* Teraz napiszemy konstruktor komórek zawierających tekst implementujący
interfejs dla komórek tabeli. Konstruktor ten będzie dzielił łańcuch na tablicę
wierszy. W tym celu użyje metody split, która tnie łańcuch w każdym miejscu
wystąpienia przekazanego jej argumentu i zwraca tablicę kawałków. */

function TextCell(text) {
    this.text = text.split("\n");
}
/**
 * Metoda minWidth znajduje najszerszą linię w tej tablicy
 */
TextCell.prototype.minWidth = function () {
    return this.text.reduce(function (width, line) {
        return Math.max(width, line.length);
    }, 0);
};
/**
 * Metoda minWidth znajduje wysokość komórki  w tej tablicy - tj. liczba tablic wierszy komórki
 */
TextCell.prototype.minHeight = function () {
    return this.text.length;
};

TextCell.prototype.draw = function (width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(line + repeat(" ", width - line.length));
    }
    return result;
};


var MOUNTAINS = [{
        name: "Kilimanjaro",
        height: 5895,
        country: "Tanzania"
    },
    {
        name: "Everest",
        height: 8848,
        country: "Nepal"
    },
    {
        name: "Mount Fuji",
        height: 3776,
        country: "Japan"
    },
    {
        name: "Mont Blanc",
        height: 4808,
        country: "Italy/France"
    },
    {
        name: "Vaalserberg",
        height: 323,
        country: "Netherlands"
    },
    {
        name: "Denali",
        height: 6168,
        country: "United States"
    },
    {
        name: "Popocatepetl",
        height: 5465,
        country: "Mexico"
    }
]

/* kompozycja a nie dziedziczenie - polem 'klasy' UnderlinedCell jest inna klasa */
function UnderlinedCell(inner) {
    this.inner = inner;
};

/* przekazywanie wywołań 'własnych' metod do metod pola-klasy . */
UnderlinedCell.prototype.minWidth = function () {
    return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function () {
    return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function (width, height) {
    return this.inner.draw(width, height - 1)
        .concat([repeat("-", width)]);
};;

// [ 
//     [##; 0,1; ##; 0,3; ##] 
//     [1,0; ##; 1,2; ##; 1,4] 
// ]
function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function (name) {
        return new UnderlinedCell(new TextCell(name));
    });
    var body = data.map(function (row) {
        return keys.map(function (name) {
            return new TextCell(String(row[name]));
        });
    });

    return [headers].concat(body);
}

// console.log(drawTable(dataTable(MOUNTAINS)));

function RTextCell(text) {
    TextCell.call(this, text);
}

RTextCell.prototype = Object.create(TextCell.prototype);

RTextCell.prototype.draw = function (width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(repeat(" ", width - line.length) + line);
    }
    return result;
};

// Write a class Vec that represents a vector in two-dimensional space. It takes x and y parameters (numbers), which it should save to properties of the same name.
// Give the Vec prototype two methods, plus and minus, that take another vector as a parameter and return a new vector that has the sum or difference of the two vectors’ (this and the parameter) x and y values.
// Add a getter property length to the prototype that computes the length of the vector—that is, the distance of the point (x, y) from the origin (0, 0).
// Your code here.
// console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// // → Vec{x: 3, y: 5}
// console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// // → Vec{x: -1, y: -1}
// console.log(new Vec(3, 4).length);
// // → 5

//taki efekt można uzyskać nawet refaktorem vsc

// class oldVec {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
//     plus() { }
// }



// es2015
class Vec {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    // Give the Vec prototype two methods, plus and minus, that take another vector as a parameter and return a new vector that has the sum or difference of the two vectors’ (this and the parameter) x and y values.
    plus(vec) {
        return new Vec(this.x + vec.x, this.y + vec.y);
    };

    minus(vec) {
        return new Vec(this.x - vec.x, this.y - vec.y);
    };

    get length() {
        return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );
    }
}

// nie da się tu użyć plus = () => {}, bo class obecnie w interfejsie mogą mieć wyłącznie metody - chyba, że zostaną zbabelizowane jako class properties

console.log(new Vec(1, 2).plus(new Vec(2, 3)));

console.log(new Vec(1, 2).minus(new Vec(2, 3)));

console.log(new Vec(3, 4).length);