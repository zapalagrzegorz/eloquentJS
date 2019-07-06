
class Picture {
    readonly width: number;
    readonly height: number;
    private readonly pixels: any;
  
    constructor(width: number, height: number, pixels: any) {
      this.width = width;
      this.height = height;
      this.pixels = pixels;
    }
  
    static empty(width: number, height: number, color: any) {
      const pixels = new Array(width * height).fill(color);
      return new Picture(width, height, pixels);
    }
  
    pixel(x: number, y: number) {
      return this.pixels[x + y * this.width];
    }
  
    draw(pixels: any) {
      const copy = this.pixels.slice();
      for (const { x, y, color } of pixels) {
        copy[x + y * this.width] = color;
      }
      return new Picture(this.width, this.height, copy);
    }
  }

  
const scale = 10;

class PictureCanvas {
  private picture: any;

  private readonly pointerDown: any;
  readonly dom: any;
  mouse: any;
  touch: any;

  constructor(picture: Picture, pointerDown: any) {
    this.dom = elt('canvas', {
      onmousedown: (event: MouseEvent) => this.mouse(event, pointerDown),
      ontouchstart: (event: TouchEvent) => this.touch(event, pointerDown),
    });
    this.syncState(picture);
  }

  syncState(picture: Picture) {
    if (this.picture == picture) return;
    this.picture = picture;
    drawPicture(this.picture, this.dom, scale);
  }
}