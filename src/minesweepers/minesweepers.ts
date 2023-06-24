import { Pos, PosType } from "../components/pos";
import { Mine, MineInf } from "./mine";

export enum Direction {
  Up = 0,
  UpRight,
  Right,
  RightDown,
  Down,
  LeftDown,
  Left,
  LeftUp,
}

export interface PosWithValue {
  pos: PosType;
  value: number;
}

export interface MineSpeeperTYpe {
  width: number;
  height: number;
  isFailed: boolean;
  mines: Mine[];
  positions: PosWithValue[][];
}

export class MineSweepers implements MineSpeeperTYpe {
  width: number;
  height: number;
  isFailed: boolean;
  mines: Mine[];
  bombCount: number;
  positions: PosWithValue[][];

  constructor(
    width: number,
    height: number,
    isFailed: boolean,
    mines: Mine[],
    bombCount: number,
    positions: PosWithValue[][]
  ) {
    this.width = width;
    this.height = height;
    this.isFailed = isFailed;
    this.mines = mines;
    this.bombCount = bombCount;
    this.positions = positions;
  }

  static default(width = 16, height = 30, bombCount = 20) {
    let positions: Array<Array<PosWithValue>> = Array(height)
      .fill(0)
      .map((_, y) =>
        Array(width)
          .fill(0)
          .map((_, x) => ({ pos: Pos.new(x, y), value: 0 }))
      );

    let mines: Mine[] = [];
    while (mines.length < bombCount) {
      let mine = Mine.default(
        ~~(Math.random() * height),
        ~~(Math.random() * width)
      );
      if (!mines.some((m) => m.eq(mine))) {
        mines.push(mine);
        positions[mine.x][mine.y] = { pos: mine, value: -1 };
      }
    }

    return new MineSweepers(width, height, false, mines, bombCount, positions);
  }

  isMine(pos: Pos): Boolean {
    const { value } = this.getPosition(pos);
    return value! < 0;
  }

  isInBounds(pos: Pos): boolean {
    return (
      pos.x >= 0 && pos.x < this.width && pos.y >= 0 && pos.y < this.height
    );
  }

  getPosition(pos: Pos) {
    return this.positions[pos.y][pos.x];
  }

  iterDirection(): number[] {
    return [
      Direction.Up,
      Direction.Right,
      Direction.Down,
      Direction.Left,
      Direction.UpRight,
      Direction.LeftDown,
      Direction.RightDown,
      Direction.LeftUp,
    ];
  }

  next(pos: Pos, direction: Direction): Pos {
    switch (direction) {
      case Direction.Up || 0:
        return pos.add(Pos.new(0, -1));
      case Direction.UpRight || 1:
        return pos.add(Pos.new(1, -1));
      case Direction.Right || 2:
        return pos.add(Pos.new(1, 0));
      case Direction.RightDown || 3:
        return pos.add(Pos.new(1, 1));
      case Direction.Down || 4:
        return pos.add(Pos.new(0, 1));
      case Direction.LeftDown || 5:
        return pos.add(Pos.new(-1, 1));
      case Direction.Left || 6:
        return pos.add(Pos.new(-1, 0));
      case Direction.LeftUp || 7:
        return pos.add(Pos.new(-1, -1));
      default: {
        console.warn("where do you want to go ???", direction);
        return pos;
      }
    }
  }

  scan(startPos: PosWithValue) {
    if (this.isMine(startPos.pos)) {
      this.isFailed = true;
      this.positions.forEach((v, index, arr) => {
        arr[index] = v.map((posWithValue) => {
          if (posWithValue.value < 0) {
            (posWithValue.pos as MineInf).isShow = true;
          }
          return posWithValue;
        });
      });
      return;
    }
    this.search(startPos.pos, []);
  }

  search(pos: Pos, scanned: Pos[] = []) {
    let queue = [pos];
    const dirs = this.iterDirection();

    while (queue.length) {
      let current = queue.shift()!;
      let count = 0;
      let tmp = [];
      for (let i = 0; i < dirs.length; i++) {
        let dir = dirs[i];
        let nextPos = this.next(current, dir);
        if (!this.isInBounds(nextPos)) continue;

        // if (
        //   this.getPosition(nextPos).value > 0 ||
        //   scanned.some((p) => nextPos.eq(p))
        // ) {
        //   console.log("scanned");
        //   continue;
        // }

        if (this.isMine(nextPos)) {
          count += 1;
        } else {
          tmp.push(nextPos);
        }
      }
      if(count > 0) {
        this.getPosition(current).value = count;
      } else {
        tmp.forEach(pos => {
          if(
            queue.every(posInQueue => !posInQueue.eq(pos)) &&
            scanned.every(posScanned => !posScanned.eq(pos))
          ) {
            queue.push(pos);
          }
        })
      } 
      scanned.push(current);
      // debugger
    }
  }

  clone() {
    const { width, height, isFailed, mines, bombCount, positions } = this;
    return new MineSweepers(
      width,
      height,
      isFailed,
      mines,
      bombCount,
      positions
    );
  }

  iterPosition() {
    return this.positions.flatMap((arr) => arr.map((p) => p));
  }
}
