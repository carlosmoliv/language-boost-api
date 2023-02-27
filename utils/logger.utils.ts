import pino from "pino";
import expressPino from "pino-http";
import pinoPretty from "pino-pretty";

const LOG_LEVEL = process.env.LOG_LEVEL || "info";

const stream = pinoPretty({
  colorize: true,
  colorizeObjects: true,
  levelFirst: true,
});

export const logger = pino({ level: LOG_LEVEL }, stream);
export const expressLogger = expressPino({ logger });
