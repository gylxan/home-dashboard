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

router
  .route('/statistics/general')
  // Get one by name
  .get((req, res, next) => {
    db.find({})
      .sort({ playTime: 1 })
      .exec(function (error: any, docs: any[]) {
        const wins = new Map();
        for (const game of docs) {
          if (!wins.has(game.winner.name)) {
            wins.set(game.winner.name, 0);
          }
          wins.set(game.winner.name, (wins.get(game.winner.name) || 0) + 1);
        }
        let winner;
        const winnerRecord = [...wins].sort((a, b) => (a[1] > b[1] && -1) || (a[1] === b[1] ? 0 : 1)).shift();
        if (!!winnerRecord) {
          winner = winnerRecord[0];
        }
        res.send({
          lastWinner: !!docs[docs.length - 1] ? docs[docs.length - 1].winner.name : undefined,
          lastPlayTime: !!docs[docs.length - 1] ? docs[docs.length - 1].playTime : undefined,
          playedGamesAmount: docs.length,
          totalWinner: winner,
        });
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
