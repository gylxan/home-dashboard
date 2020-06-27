import { Router } from 'express';
const router = Router();
import { db, ROUTE as SKIPBO_ROUTE } from './skipbo';

export const ROUTE = SKIPBO_ROUTE + '/statistics';
router
  .route('/general')
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
          winner = winnerRecord;
        }
        res.send({
          lastWinner: {
            label: 'Letzter Gewinner',
            value: !!docs[docs.length - 1] ? docs[docs.length - 1].winner.name : undefined,
          },
          lastPlayTime: {
            label: 'Letzte Spielzeit',
            value: !!docs[docs.length - 1] ? docs[docs.length - 1].playTime : undefined,
          },
          playedGamesAmount: { label: 'Spiele insgesamt', value: docs.length },
          winnersAmount: { label: 'Gewinner insgesamt', value: wins.size },
          totalWinner: {
            label: 'Gewinner',
            value: !!winner ? `${winner[0]} (${winner[1]})` : '',
          },
        });
      });
  });

router.route('/games-per-winner').get((req, res, next) => {
  db.find({}, function (error: any, docs: any[]) {
    res.send(
      docs.reduce((prev: any[], curr) => {
        const entryIndex = prev.findIndex((value) => value.name === curr.winner.name);
        if (entryIndex === -1) {
          return [...prev, { name: curr.winner.name, y: 1 }];
        }
        prev[entryIndex].y++;
        return prev;
      }, []),
    );
  });
});

export default router;
