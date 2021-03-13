import { verify } from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';
import { Code, createApiError } from '../helpers/error';
import { getEnvVar } from '../helpers/environment';

export const verifyToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { authorization: bearer } = req.headers;

  if (!bearer) {
    return createApiError(res, 403, Code.MissingToken, 'Fehlendes JWT-Token');
  }

  const bearerToken = bearer.split(' ')[1] ?? '';

  verify(bearerToken, getEnvVar('JWT_TOKEN_SECRET') as string, (err, decoded) => {
    if (err) {
      return createApiError(res, 401, Code.Unauthorized, 'Unautorisiert');
    }
    req.params['userId'] = (decoded as { id: string }).id;
    next();
  });
};

export const verifyIsCurrentUser = (req: Request, res: Response, next: NextFunction): Response | void => {
  const user = req.body;

  if (user.id !== req.params['userId']) {
    return createApiError(res, 403, Code.Forbidden, 'Zugriff für den Benutzer nicht erlaubt');
  }
  next();
};
