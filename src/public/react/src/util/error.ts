export enum Code {
  InvalidClientVersion = 'invalidClientVersion',
}

export interface Error {
  code: string;
  message: string;
}
