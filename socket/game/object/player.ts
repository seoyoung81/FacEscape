export class Player {
  id!: number;
  x!: number;
  y!: number;
  stage!: string;

  constructor(id: number, x: number, y: number, stage: string) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.stage = stage;
  }
}
