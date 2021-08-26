import * as DataStore from 'nedb';

export const execIfColumnNotExisting = (db: DataStore, column: string, callback: () => void): void => {
  db.find({}, function (error: any, docs: any[]) {
    const docWithColumn = docs.some((doc) => typeof doc[column] !== 'undefined');

    if (!docWithColumn) {
      callback();
    }
  });
};
