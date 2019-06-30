// <textarea id="code">return "hi";</textarea>
// <button id="button">Run</button>
// <pre id="output"></pre>
document.addEventListener('DOMContentLoaded', () => {
    
    // <script>

    const run = document.querySelector<HTMLButtonElement>('#button');
    const output = document.querySelector<HTMLPreElement>('#output');

    if(!run || !output){
        return;
    }

    run.addEventListener('click', function(){
        
        const code = document.querySelector<HTMLTextAreaElement>('#code');
        if(!code){
            return;
        }
        try{
            const result = Function(code.value)();
            output.innerText = String(result);
        }
        catch(err){
            output.innerText = "Error: " + err.message;
        }
    });
    // </script>
});
