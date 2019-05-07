"use strict";
/* trapezoid  */
window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.querySelector('canvas');
    function getCx(canvas) {
        if (!canvas) {
            return;
        }
        var cx = canvas.getContext('2d');
        if (cx) {
            return cx;
        }
    }
    function writeTrapezoid() {
        var cx = getCx(canvas);
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
        var cx = getCx(canvas);
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
        var cx = getCx(canvas);
        if (!cx) {
            return;
        }
        cx.beginPath();
        cx.moveTo(260, 0);
        for (var y = 5, x = 200; y <= 50; y += 5) {
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
        var cx = getCx(canvas);
        if (!cx) {
            return;
        }
        cx.beginPath(); // tell canvas to start a set of lines
        var step = (2 * Math.PI) / 180; // 2pi/180 = 1 degree
        for (var angle = 0, r = 0.1; angle < 6 * Math.PI; angle += step, r += 0.1) {
            var x = 350 + r * Math.cos(angle);
            var y = 50 + r * Math.sin(angle); // note 2.
            cx.lineTo(x, y);
        }
        cx.stroke();
    }
    function staring() {
        var cx = getCx(canvas);
        if (!cx) {
            return;
        }
        cx.beginPath(); // tell canvas to start a set of lines
        var step = (2 * Math.PI) / 8; // 2pi/180 = 1 degree
        var centerCircleX = 500;
        var centerCircleY = 50;
        for (var angle = 0, r = 40; angle < 6 * Math.PI; angle += step) {
            var x = centerCircleX + r * Math.cos(angle);
            var y = centerCircleY + r * Math.sin(angle);
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
