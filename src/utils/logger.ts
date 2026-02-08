import chalk from 'chalk';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  SUCCESS = 2,
  WARN = 3,
  ERROR = 4,
}

class Logger {
  private level: LogLevel = LogLevel.INFO;

  setLevel(level: LogLevel) {
    this.level = level;
  }

  debug(message: string, ...args: any[]) {
    if (this.level <= LogLevel.DEBUG) {
      console.log(chalk.gray(`[DEBUG] ${message}`), ...args);
    }
  }

  info(message: string, ...args: any[]) {
    if (this.level <= LogLevel.INFO) {
      console.log(chalk.blue(`[INFO] ${message}`), ...args);
    }
  }

  success(message: string, ...args: any[]) {
    if (this.level <= LogLevel.SUCCESS) {
      console.log(chalk.green(`✓ ${message}`), ...args);
    }
  }

  warn(message: string, ...args: any[]) {
    if (this.level <= LogLevel.WARN) {
      console.warn(chalk.yellow(`[WARN] ${message}`), ...args);
    }
  }

  error(message: string, error?: Error | any, ...args: any[]) {
    if (this.level <= LogLevel.ERROR) {
      console.error(chalk.red(`[ERROR] ${message}`), ...args);
      if (error) {
        if (error instanceof Error) {
          console.error(chalk.red(error.stack || error.message));
        } else {
          console.error(chalk.red(JSON.stringify(error, null, 2)));
        }
      }
    }
  }

  section(title: string) {
    console.log('\n' + chalk.bold.cyan(`═══ ${title} ═══`) + '\n');
  }

  step(step: number, total: number, message: string) {
    console.log(chalk.magenta(`[${step}/${total}]`) + ` ${message}`);
  }
}

export const logger = new Logger();
