enum Level {
  Debug,
  Info,
  Warn,
  Error,
}

class Logger {
  private static _instance: Logger;
  private level: Level = Level.Info;

  private static getLogger() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  public setLevel(level: Level): void {
    this.level = level;
  }

  public getLevel(): Level {
    return this.level;
  }

  public static set setLogLevel(level: Level) {
    Logger.getLogger().setLevel(level);
  }

  public static debug(msg: string): void {
    Logger.getLogger().log(Level.Debug, msg);
  }

  public static info(msg: string): void {
    Logger.getLogger().log(Level.Info, msg);
  }
  public static warn(msg: string): void {
    Logger.getLogger().log(Level.Warn, msg);
  }
  public static error(msg: string): void {
    Logger.getLogger().log(Level.Error, msg);
  }

  private log(level: Level, msg: string): void {
    if (this.level > level) {
      return;
    }
    let logLevel;
    switch (level) {
      case Level.Debug:
        logLevel = 'DEBUG';
        break;
      case Level.Warn:
        logLevel = 'WARN';
        break;
      case Level.Error:
        logLevel = 'ERROR';
        break;
      case Level.Info:
      default:
        logLevel = 'INFO';
        break;
    }

    console.log(`[${logLevel}] ${msg}`);
  }
}

export default Logger;
