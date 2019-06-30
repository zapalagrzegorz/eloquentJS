"use strict";
// <textarea id="code">return "hi";</textarea>
// <button id="button">Run</button>
// <pre id="output"></pre>
document.addEventListener('DOMContentLoaded', () => {
    // <script>
    const run = document.querySelector('#button');
    const output = document.querySelector('#output');
    if (!run || !output) {
        return;
    }
    run.addEventListener('click', function () {
        const code = document.querySelector('#code');
        if (!code) {
            return;
        }
        try {
            const result = Function(code.value)();
            output.innerText = String(result);
        }
        catch (err) {
            output.innerText = "Error: " + err.message;
        }
    });
    // </script>
});
