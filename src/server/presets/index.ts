import * as DataStore from 'nedb';
import { User } from '../interfaces/user';

export const execIfEmpty = (db: DataStore, callback: () => void): void => {
  db.find({}, function (error: any, docs: User[]) {
    if (docs.length === 0) {
      callback();
    }
  });
};
