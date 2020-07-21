import { Dir } from "fs";

export enum Direction {
  North,
  East,
  South,
  West,
};

export default class Robot {
  private readonly WIDTH = 5;
  private readonly HEIGHT = 5;
  private x:number = -1;
  private y:number = -1;
  private f:Direction;
  private placed:boolean = false;

  place(x: number, y: number, f: Direction | string): void {
    if (x < 0 || x >= this.WIDTH) {
      console.log(`PLACE: args(${x}, ${y}, ${f}) are invalid`);
      return;
    }

    if (y < 0 || y >= this.HEIGHT) {
      console.log(`PLACE: args(${x}, ${y}, ${f}) are invalid`);
      return;
    }

    if ((typeof f) === 'string') {
      const directionString = (f as string).toLowerCase();
      if (directionString === 'north' || directionString === 'n') {
        this.f = Direction.North;
      } else if (directionString === 'east' || directionString === 'e') {
        this.f = Direction.North;
      } else if (directionString === 'south' || directionString === 's') {
        this.f = Direction.North;
      } else if (directionString === 'west' || directionString === 'w') {
        this.f = Direction.North;
      } else {
        console.log(`PLACE: args(${x}, ${y}, ${f}) are invalid`);
        return;
      }
    } else {
      this.f = (f as Direction);
    }

    this.x = x;
    this.y = y;
    this.placed = true;
  }

  left(): void {
    if (this.placed) {
      this.f = (this.f + 3) % 4;
    }
  }

  right(): void {
    if (this.placed) {
      this.f = (this.f + 1) % 4;
    }
  }

  move(): void {
    let newX = this.x;
    let newY = this.y;

    if (this.placed) {
      switch (this.f) {
        case Direction.North:
          newY += 1;
          break;
        case Direction.East:
          newX += 1;
          break;
        case Direction.South:
          newY -= 1;
          break;
        case Direction.West:
          newX -= 1;
          break;
      }

      if (newX < 0 || newX >= this.WIDTH) {
        console.log(`MOVE: can't move. current place: (${this.x}, ${this.y}, ${this._directionString()})`);
        return;
      }

      if (newY < 0 || newY >= this.HEIGHT) {
        console.log(`MOVE: can't move. current place: (${this.x}, ${this.y}, ${this._directionString()})`);
        return;
      }

      this.x = newX;
      this.y = newY;
    }
  }

  report(): (string | null) {
    if (this.placed) {
      return `${this.x}, ${this.y}, ${this._directionString()}`;
    }
    return null;
  }

  _directionString(): string {
    switch (this.f) {
      case Direction.North:
        return "NORTH";
      case Direction.East:
        return "EAST";
      case Direction.South:
        return "SOUTH";
      case Direction.West:
        return "WEST";
      default:
        return "";
    }
  }
}