import './example-js-01'

interface Logger {
    log(message: string): void;
  }
  
  class Counter {
    constructor(private logger: Logger) {}
    
    public state: number = 0;
    
    public increase(): void {
      this.state += 1;
      this.logger.log(`State increased. Current state is ${this.state}.`);
    }
    
    public decrease(): void {
      this.state -= 1;
      this.logger.log(`State increased. Current state is ${this.state}.`);
    }
  }
  // console.log(ab)