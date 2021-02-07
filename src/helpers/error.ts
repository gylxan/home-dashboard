export enum Code {
  InvalidClientVersion = 'invalidClientVersion',
  HueBridgeNotConnected = 'hueBridgeNotConnected',
}

export interface Error {
  code: string;
  message: string;
}

export const createError = (code: Code, message: string): { error: Error } => ({
  error: {
    code,
    message,
  },
});
