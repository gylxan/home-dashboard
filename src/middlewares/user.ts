import { isEmpty } from '../helpers/string';
import { Code, createApiError } from '../helpers/error';
import { db } from '../controllers/login';
import { NextFunction, Request, Response } from 'express';

export const checkDuplicateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { username } = req.body;
  if (isEmpty(username)) {
    createApiError(res, 400, Code.MissingUsername, 'Benutzername ist leer');
    return;
  }

  let isUserExisting = false;
  db.find({ username }, function () {
    isUserExisting = true;
  });

  if (isUserExisting) {
    createApiError(res, 400, Code.UsernameAlreadyExists, 'Benutzername wird bereits verwendet');
    return;
  }

  next();
};

export const checkUserSent = (req: Request, res: Response, next: NextFunction): void => {
  const { username } = req.body;
  if (isEmpty(username)) {
    createApiError(res, 400, Code.MissingUsername, 'Benutzername ist leer');
    return;
  }

  next();
};

export const checkPasswordSent = (req: Request, res: Response, next: NextFunction): void => {
  const { password } = req.body;
  if (isEmpty(password)) {
    createApiError(res, 400, Code.MissingPassword, 'Passwort ist leer');
    return;
  }

  next();
};
