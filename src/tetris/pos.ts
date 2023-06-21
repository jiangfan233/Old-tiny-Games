export interface PosType {
  x: number;
  y: number;
  add(other: Pos):Pos;
}

export class Pos implements PosType {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static new(x: number, y: number) {
    return new Pos(x, y);
  }

  add(other: Pos):Pos {
    return Pos.new(this.x + other.x, this.y + other.y);
  }
}