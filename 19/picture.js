"use strict";
class Picture {
    constructor(width, height, pixels) {
        this.width = width;
        this.height = height;
        this.pixels = pixels;
    }
    static empty(width, height, color) {
        const pixels = new Array(width * height).fill(color);
        return new Picture(width, height, pixels);
    }
    pixel(x, y) {
        return this.pixels[x + y * this.width];
    }
    draw(pixels) {
        const copy = this.pixels.slice();
        for (const { x, y, color } of pixels) {
            copy[x + y * this.width] = color;
        }
        return new Picture(this.width, this.height, copy);
    }
}
const scale = 10;
class PictureCanvas {
    constructor(picture, pointerDown) {
        this.dom = elt('canvas', {
            onmousedown: (event) => this.mouse(event, pointerDown),
            ontouchstart: (event) => this.touch(event, pointerDown),
        });
        this.syncState(picture);
    }
    syncState(picture) {
        if (this.picture == picture)
            return;
        this.picture = picture;
        drawPicture(this.picture, this.dom, scale);
    }
}
