import * as DataStore from 'nedb';
import { execIfColumnNotExisting } from './index';
import Logger from '../classes/Logger';

export const migrate = (db: DataStore): void => {
  Logger.debug('Migrate games.db');

  execIfColumnNotExisting(db, 'location', () => {
    db.update({}, { $set: { location: { latitude: 0, longitude: 0 } } }, { multi: true }, (err, numUpdated) => {
      Logger.debug(`Added location to ${numUpdated} entries`);
    });
  });
};
