export enum Code {
  InvalidClientVersion = 'invalidClientVersion',
  RefreshTokenInvalid = 'refreshTokenInvalid',
  TokenExpired = 'tokenExpired',
}

export interface Error {
  code: string;
  message: string;
}
