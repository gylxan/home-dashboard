export enum Code {
  InvalidClientVersion = 'invalidClientVersion',
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
