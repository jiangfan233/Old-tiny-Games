import { Pos, PosType } from "../components/pos";

export interface MineInf extends PosType {
  x: number;
  y: number;
  color: string;
  isShow: Boolean;
}

export class Mine extends Pos implements MineInf {
  color: string;
  isShow: Boolean;

  constructor(x: number, y: number, color: string, isShow: Boolean) {
    super(x, y);
    this.isShow = isShow;
    this.color = color;
  }

  static default(x: number, y: number, color = "💣", isShow = false): Mine {
    return new Mine(x, y, color, true);
  }


}
