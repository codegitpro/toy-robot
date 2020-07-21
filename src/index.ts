import fs from 'fs';
import readline from 'readline';
import Robot from './robot';

class App {
  robot: Robot = new Robot();
  reports: string[] = [];

  async start(): Promise<void> {
    this.reports = [];
    await this.readFile('./input.txt');
    await this.writeFile('./output.txt', this.reports.join("\n"));
  }

  async readFile(filepath: string): Promise<void> {

    const readInterface = readline.createInterface({
      input: fs.createReadStream(filepath)
    });

    for await (const line of readInterface) {
      this.executeLine(line);
    }

  }

  async writeFile(filepath: string, content: string): Promise<void> {
    await fs.promises.writeFile(filepath, content);
  }

  executeLine(line: string): void {
    line = line.trim();

    if (line === 'REPORT') {
      const report = this.robot.report();
      if (report) {
        this.reports.push(report);
      }
    } else if (line === 'LEFT') {
      this.robot.left();
    } else if (line === 'RIGHT') {
      this.robot.right();
    } else if (line === 'MOVE') {
      this.robot.move();
    } else if (line.startsWith('PLACE ')) {
      const args = line.substring(6).split(',');
      if (args.length === 3) {
        const x = parseInt(args[0]);
        const y = parseInt(args[1]);
        const f = args[2];
        this.robot.place(x, y, f);
      }
    }
  }
}

const app = new App();
app.start();