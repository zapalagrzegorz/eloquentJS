"use strict";
/* trapezoid  */
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas');
    function getCx(canvas) {
        if (!canvas) {
            return;
        }
        const cx = canvas.getContext('2d');
        if (cx) {
            return cx;
        }
    }
    function writeTrapezoid() {
        const cx = getCx(canvas);
        if (!cx) {
            return;
        }
        cx.beginPath();
        cx.lineTo(40, 10);
        cx.lineTo(70, 10);
        cx.lineTo(100, 40);
        cx.lineTo(10, 40);
        cx.closePath();
        cx.strokeStyle = 'blue';
        cx.stroke();
    }
    function writeDiamond() {
        const cx = getCx(canvas);
        if (!cx) {
            return;
        }
        cx.fillStyle = 'red';
        cx.save();
        cx.translate(140, 0);
        cx.rotate((1 / 4) * Math.PI);
        cx.fillRect(0, 0, 40, 40);
        cx.restore();
    }
    function zigZaging() {
        const cx = getCx(canvas);
        if (!cx) {
            return;
        }
        cx.beginPath();
        cx.moveTo(260, 0);
        for (let y = 5, x = 200; y <= 50; y += 5) {
            cx.lineTo(x, y);
            if (y % 2 === 0) {
                x = 260;
            }
            else {
                x = 200;
            }
        }
        cx.strokeStyle = 'black';
        cx.stroke();
    }
    function circling() {
        const cx = getCx(canvas);
        if (!cx) {
            return;
        }
        cx.beginPath(); // tell canvas to start a set of lines
        const step = (2 * Math.PI) / 180; // 2pi/180 = 1 degree
        for (let angle = 0, r = 0.1; angle < 6 * Math.PI; angle += step, r += 0.1) {
            const x = 350 + r * Math.cos(angle);
            const y = 50 + r * Math.sin(angle); // note 2.
            cx.lineTo(x, y);
        }
        cx.stroke();
    }
    function staring() {
        const cx = getCx(canvas);
        if (!cx) {
            return;
        }
        cx.beginPath(); // tell canvas to start a set of lines
        const step = (2 * Math.PI) / 8; // 2pi/180 = 1 degree
        const centerCircleX = 500;
        const centerCircleY = 50;
        for (let angle = 0, r = 40; angle < 6 * Math.PI; angle += step) {
            const x = centerCircleX + r * Math.cos(angle);
            const y = centerCircleY + r * Math.sin(angle);
            // control=(500,50) goal=(x,y)
            cx.quadraticCurveTo(500, 50, x, y);
        }
        cx.fillStyle = 'orange';
        cx.fill();
    }
    writeTrapezoid();
    zigZaging();
    writeDiamond();
    circling();
    staring();
});
// A red diamond
