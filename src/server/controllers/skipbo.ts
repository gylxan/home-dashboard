import { Router } from 'express';
import * as DataStore from 'nedb';
import { SkipboGame } from '../interfaces/skipbo';
import { verifyToken } from '../middlewares/auth';
import { getEnvVar } from '../helpers/environment';
import { getUserId } from '../helpers/request';
import { migrate } from '../migrations/skipbo';
import Logger from "../classes/Logger";

export const db = new DataStore({ filename: getEnvVar('DB_DIR') + '/games.db', autoload: true });

migrate(db);
const router = Router();

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
  .post(verifyToken, (req, res) => {
    db.insert(
      { playTime: req.body.playTime, winner: req.body.winner, location: req.body.location },
      function (error: unknown, docs: SkipboGame) {
        Logger.debug(`User ${getUserId(req)} added skipbo game with id ${docs._id}`);
        res.send(docs);
      },
    );
  });

router
  .route('/winners')
  // Get one by name
  .get((req, res) => {
    db.find({})
      .sort({ 'winner.name': 1 })
      .exec(function (error: unknown, docs: SkipboGame[]) {
        res.send(
          docs.reduce(
            (prev: string[], curr) =>
              !prev.find((winner: string) => winner === curr.winner.name) && curr.winner.name.trim() !== ''
                ? [...prev, curr.winner.name]
                : prev,
            [],
          ),
        );
      });
  });

// Root with name identifier
router
  .route('/:id')
  // Delete one by id
  .delete(verifyToken, (req, res) => {
    db.remove({ _id: req.params.id }, (error: unknown, removedItems) => {
      console.debug(`User ${getUserId(req)} removed ${removedItems} skipbo game(s) for id ${req.params.id}`);
      db.find({})
        .sort({ playTime: -1 })
        .exec(function (err, docs) {
          res.send(docs);
        });
    });
  });
export default router;
