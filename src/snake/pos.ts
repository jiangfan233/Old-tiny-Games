export interface PosInf {
  x: number;
  y: number;
}


export class Pos implements PosInf {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }


  static new<T extends typeof Pos>(x: number, y: number): InstanceType<T> {
    return new this(x, y) as InstanceType<T>;
  }


  add(rhs: Pos): Pos {
    return Pos.new(
      this.x + rhs.x,
      this.y + rhs.y,
    );
  }

  eq(rhs: Pos) :boolean {
    return this.x === rhs.x && this.y === rhs.y;
  }

}


export interface FoodInf extends PosInf {
  food_color: string;
}

export class Food extends Pos implements FoodInf {
  food_color!: string;

  constructor(x:number, y: number, food_color: string) {
    super(x, y);
    this.food_color = food_color;
  }

  static newFood(x:number, y: number, food_color: string) {
    return new Food(x, y, food_color);
  }

}

