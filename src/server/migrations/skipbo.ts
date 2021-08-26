import * as DataStore from 'nedb';
import { execIfColumnNotExisting } from './index';

export const migrate = (db: DataStore): void => {
  console.log('[DEBUG] Migrate games.db');

  execIfColumnNotExisting(db, 'location', () => {
    db.update({}, { $set: { location: { latitude: 0, longitude: 0 } } }, { multi: true }, (err, numUpdated) => {
      console.log(`[DEBUG] Added location to ${numUpdated} entries`);
    });
  });
};
