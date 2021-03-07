import { Router } from 'express';
const router = Router();
import * as DataStore from 'nedb';
import { SkipboGame } from '../interfaces/skipbo';
import { verifyToken } from '../middlewares/auth';
export const db = new DataStore({ filename: './db/games.db', autoload: true });

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
    db.insert({ playTime: req.body.playTime, winner: req.body.winner }, function (error: unknown, docs: SkipboGame) {
      res.send(docs);
    });
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
      console.log(`Removed ${removedItems} skipbo game(s) for id ${req.params.id}`);
      res.send();
    });
  });
export default router;
