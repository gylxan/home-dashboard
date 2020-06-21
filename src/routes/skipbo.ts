import { Router } from 'express';
const router = Router();
import * as DataStore from 'nedb';
const db = new DataStore({ filename: './db/games.db', autoload: true });

export const ROUTE = '/skipbo';
// Root without parameter
router
  .route('/')
  .get((req, res) => {
    db.find({})
      .sort({ playTime: -1 })
      .exec(function (err, docs) {
        res.send(docs);
      });
  })
  .post((req, res, next) => {
    db.insert({ playTime: +new Date(), winner: req.body }, function (error: any, docs: any) {
      res.send(docs);
    });
  });

// Root with name identifier
router
  .route('/:timestamp')
  // Get one by name
  .get((req, res, next) => {
    db.find({ playTime: req.params.timestamp }, function (error: any, docs: any[]) {
      res.send(docs);
    });
  });

//     // Update ony by name
//     .put((req, res, next) => {
//         if (orderExists(req, res, next)) {
//             res.send(db.get(INDICATOR).find({ name: req.params.name }).assign(req.body).write());
//         }
//     })
//     // Delete ony by name
//     .delete((req, res, next) => {
//         if (orderExists(req, res, next)) {
//             res.send(db.get(INDICATOR)
//                 .remove({ name: req.params.name })
//                 .write());
//         }
//     });
export default router;
