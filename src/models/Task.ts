export class Task {
  id: string;
  done: boolean;

  constructor(public text: string, public order: number) {
    this.id = this.generateUniqueID();
    this.done = false;
  }

  private generateUniqueID(): string {
    return Date.now().toString(16).slice(2);
  }
}
