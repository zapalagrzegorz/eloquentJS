"use strict";
// / Powiedzmy, że mamy funkcję o nazwie primitiveMultiply, która w połowie
// przypadków mnoży dwie liczby, a w drugiej połowie przypadków zgłasza
// wyjątek typu MultiplicatorUnitFailure. Napisz funkcję opakowującą tę nędzną
// funkcję i ponawiającą próby dotąd, aż wywołanie się uda i zwróci wynik.
// Pamiętaj, aby obsługiwać tylko te wyjątki, które rzeczywiście chcesz obsłużyć.
function primitiveMultiply(x, y) {
    if (Math.random() > .5) {
        return x * y;
    }
    else {
        throw new MultiplicatorUnitFailure('błąd losowy');
    }
}
class MultiplicatorUnitFailure extends Error {
}
function selectiveError(x = 5, y = 5) {
    for (;;) {
        console.log(primitiveMultiply(x, y));
        break;
    }
}
try {
    selectiveError();
}
catch (e) {
    console.log(e instanceof MultiplicatorUnitFailure);
    if (e instanceof MultiplicatorUnitFailure) {
        console.log("Losowy bład. Spróbuj jeszcze raz.");
    }
    else {
        throw e;
    }
}
