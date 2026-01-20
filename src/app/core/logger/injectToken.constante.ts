import { InjectionToken } from "@angular/core";

export interface Logger {
  log(message: string): void;
}

export const LOGGER_TOKEN = new InjectionToken<Logger>('LOGGER_TOKEN');

export class ConsoleLogger implements Logger {
  log(message: string, context?: Record<string, unknown>): void {
    // Vous pouvez adapter le format selon vos besoins
    if (context) {
      console.log(`[LOG] ${message}`, context);
    } else {
      console.log(`[LOG] ${message}`);
    }
  }
}