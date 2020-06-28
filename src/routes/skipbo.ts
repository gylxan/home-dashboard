import { Router } from 'express';
const router = Router();
import * as DataStore from 'nedb';
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
  .post((req, res, next) => {
    db.insert({ playTime: req.body.playTime, winner: req.body.winner }, function (error: any, docs: any) {
      res.send(docs);
    });
  });

router
  .route('/winners')
  // Get one by name
  .get((req, res, next) => {
    db.find({})
      .sort({ 'winner.name': 1 })
      .exec(function (error: any, docs: any[]) {
        res.send(
          docs.reduce(
            (prev, curr) =>
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
  .route('/:timestamp')
  // Get one by name
  .get((req, res, next) => {
    db.find({ playTime: req.params.timestamp }, function (error: any, docs: any[]) {
      res.send(docs);
    });
  });
export default router;
