type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
  [key: string]: unknown;
}

function log(level: LogLevel, service: string, message: string, meta?: Record<string, unknown>): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    service,
    message,
    ...meta,
  };

  if (level === 'error') {
    console.error(JSON.stringify(entry));
  } else if (level === 'warn') {
    console.warn(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}

export const logger = {
  debug: (service: string, message: string, meta?: Record<string, unknown>) =>
    log('debug', service, message, meta),
  info: (service: string, message: string, meta?: Record<string, unknown>) =>
    log('info', service, message, meta),
  warn: (service: string, message: string, meta?: Record<string, unknown>) =>
    log('warn', service, message, meta),
  error: (service: string, message: string, meta?: Record<string, unknown>) =>
    log('error', service, message, meta),
};

export default logger;
