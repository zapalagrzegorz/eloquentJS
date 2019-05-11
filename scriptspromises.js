// This means that finding the scalpel is a matter of following the breadcrumb
// trail of storage entries, until you find a nest where that points at the nest itself.

// Write an async function locateScalpel that does this, starting at the nest
// on which it runs. You can use the anyStorage function defined earlier to access
// storage in arbitrary nests. The scalpel has been going around long enough that
// you may assume that every nest has a "scalpel" entry in its data storage.

// Next, write the same function again without using async and await.
// Do request failures properly show up as rejections of the returned promise
// in both versions? How?

async function locateScalpel(nest) {

    let sourceNest = "Big Oak";
    let targetNest = await anyStorage(nest, nest.name, 'scalpel');


    while (targetNest !== sourceNest) {
        sourceNest = targetNest;
        targetNest = await anyStorage(nest, targetNest, 'scalpel');
    }

    return targetNest

    //   let current = nest.name;
    //   for (;;) {
    //     let next = await anyStorage(nest, current, "scalpel");
    //     if (next == current) return current;
    //     current = next;
    //   }

}

function locateScalpel2(nest) {

    function loop(nestTarget) {
        return anyStorage(nest, nestTarget, 'scalpel')
            .then(function (response) {
                if (response == nestTarget) {
                    return nestTarget
                } else {
                    return loop(response);
                }
            });
    }
    return loop(nest.name);
}

function Promise_all(promises) {
    return new Promise((resolve, reject) => {
        return new Promise((resolve, reject) => {
            let promisesResult = [];
            let pending = promises.length;


            for (let i = 0; i < promises.length; i++) {
                promises[i].then(
                    (result) => {
                        promisesResult[i] = result;
                        if (--pending == 0) {
                            resolve(promisesResult)
                        }
                    },
                    function (error) {
                        reject(error)
                    }
                );
            };
            if (promises.length == 0) resolve(promisesResult);
        });
    })
}




// funkcja rekurencyjna
// function loop(current) {
//     return anyStorage(nest, current, "scalpel").then(next => {
//         if (next == current) return current;
//         else return loop(next);
//     });
// }

// return loop(nest.name);


// Next, write the same function again without using async and await.