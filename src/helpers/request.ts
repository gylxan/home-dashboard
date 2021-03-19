import { Request } from 'express';

export const getUserId = (req: Request): string => req.params['userId'];
