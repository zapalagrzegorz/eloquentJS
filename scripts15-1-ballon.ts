document.addEventListener('DOMContentLoaded', function () {
    const ballon: HTMLElement = document.querySelector('.ballon-js')! as HTMLElement;
    const text = document.createTextNode("Hello World".repeat(1000));

    let size:number;

    function setSize(newSize:number) {
        size = newSize;
        ballon.style.fontSize = size + "px";
    }

    /**
     * 
     * @param event
     */
    function changeBallonSize(event: KeyboardEvent) {


        // za każdym przyciskim odczytywałem fontSize, a mógł już byc zapisany
        // const fontSize = ballon.style.fontSize;
        // const fontSizeStr = fontSize.substring(0, fontSize.length - 2);

        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            if (event.key === "ArrowUp") {
                setSize(size * 1.1);
            } else {
                setSize(size * 0.9);
            }
        }1

        if (size > 100) {
            ballon.textContent = '💥';
            document.removeEventListener('keydown', changeBallonSize)
        }

    }

    document.querySelector('body')!.appendChild(text);
    // document.addEventListener('keydown', changeBallonSize); 

    /* class version */
    class Ballon {
        elementDOM :HTMLElement
        size: number

        constructor(element : HTMLElement){
            this.elementDOM = element;
            this.size = 0;
        }
        
        setSize(newSize: number){
            this.size = newSize;
            this.elementDOM.style.fontSize = newSize + "px";
        }

        setContent(newContent: string){
            this.elementDOM.textContent = newContent;
        }
    }

    const ballonInstanceClass =  new Ballon(document.querySelector('.ballon-js')! as HTMLElement);

    /* original */
    function handleArrow(event: KeyboardEvent) {
        if (event.key == "ArrowUp") {
            
            if (ballonInstanceClass.size > 70) {
                ballonInstanceClass.setContent("💥");
                document.body.removeEventListener("keydown", handleArrow);
            } else {
                ballonInstanceClass.setSize(ballonInstanceClass.size * 1.1)
                event.preventDefault();
            }
        } else if (event.key == "ArrowDown") {
            ballonInstanceClass.setSize(ballonInstanceClass.size * .9);
            event.preventDefault();
        }
    }


    

    document.body.addEventListener("keydown", handleArrow);

});