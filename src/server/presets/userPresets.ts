import * as DataStore from 'nedb';
import { execIfEmpty } from './index';
import Logger from '../classes/Logger';

export const preset = (db: DataStore): void =>
  execIfEmpty(db, () => {
    Logger.debug(`Prefill users.db with presets`);
    db.insert({
      username: 'admin',
      password: '$2a$08$YYSflch.lUxcz/0NgWq6nOnxoFz686gySKez.aYfIwr168vJstQPy',
    });
    Logger.debug(`Finished prefilling users.db`);
  });
