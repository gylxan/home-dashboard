import { Response } from 'express-serve-static-core';

export enum Code {
  InvalidClientVersion = 'invalidClientVersion',
  HueBridgeNotConnected = 'hueBridgeNotConnected',
  MissingUsername = 'missingUsername',
  MissingPassword = 'missingPassword',
  UsernameAlreadyExists = 'usernameAlreadyExists',
  InvalidCredentials = 'invalidCredentials',
  Unauthorized = 'unauthorized',
  MissingToken = 'missingToken',
  TokenExpired = 'tokenExpired',
  RefreshTokenInvalid = 'refreshTokenInvalid',
  Forbidden = 'forbidden',
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

export const createApiError = (res: Response, responseCode: number, errorCode: Code, message: string): Response =>
  res.status(responseCode).send(createError(errorCode, message ?? ''));
