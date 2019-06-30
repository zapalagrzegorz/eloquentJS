"use strict";
document.addEventListener('DOMContentLoaded', () => {
    (async () => {
        const promisArr = [];
        promisArr.push(fetch('https://eloquentjavascript.net/author', {
            headers: { accept: 'text/plain' },
        }));
        promisArr.push(fetch('https://eloquentjavascript.net/author', {
            headers: { accept: 'text/html' },
        }));
        // promisArr.push(
        //   fetch('https://eloquentjavascript.net/author', {
        //     headers: { accept: 'application/json' },
        //   }),
        // );
        // promisArr.push(
        //   fetch('https://eloquentjavascript.net/author', {
        //     headers: { accept: 'application/rainbows+unicorns' },
        //   }),
        // );
        const resolvedPromiseArr = await Promise.all(promisArr);
        for (const resolved of resolvedPromiseArr) {
            console.log(await resolved.text());
        }
        // const textPlainResponse = await textPlain;
        // const textHTMLResponse = await textHTML;
        // const textJSONResponse = await textJSON;
        // const textUnicornsResonse = await textUnicorns;
        // console.log(await textPlainResponse.text());
        // console.log(await textHTMLResponse.text());
        // console.log(await textJSONResponse.json());
        // console.log(await textUnicornsResonse.text());
    })();
});
