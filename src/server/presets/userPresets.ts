import * as DataStore from 'nedb';
import { execIfEmpty } from './index';

export const preset = (db: DataStore): void =>
  execIfEmpty(db, () => {
    console.log('[DEBUG] Prefill users.db with presets');
    db.insert({
      username: 'admin',
      password: '$2a$08$YYSflch.lUxcz/0NgWq6nOnxoFz686gySKez.aYfIwr168vJstQPy',
    });
    console.debug('[DEBUG] Finished prefilling users.db');
  });
