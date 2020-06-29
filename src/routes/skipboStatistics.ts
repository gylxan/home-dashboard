import { Router } from 'express';
const router = Router();
import { db, ROUTE as SKIPBO_ROUTE } from './skipbo';

export const ROUTE = SKIPBO_ROUTE + '/statistics';
router
  .route('/general')
  // Get one by name
  .get((req, res, next) => {
    db.find({})
      .sort({ playTime: 1, 'winner.name': -1 })
      .exec(function (error: any, docs: any[]) {
        const playerToPoints = new Map();
        for (const game of docs) {
          if (!playerToPoints.has(game.winner.name)) {
            playerToPoints.set(game.winner.name, 0);
          }
          playerToPoints.set(game.winner.name, (playerToPoints.get(game.winner.name) || 0) + 1);
        }
        // Switch winners with points (4 => [USER A, USER B]
        const pointToWinners = new Map();
        for (const player of playerToPoints.keys()) {
          if (!pointToWinners.has(playerToPoints.get(player))) {
            pointToWinners.set(playerToPoints.get(player), []);
          }
          pointToWinners.set(playerToPoints.get(player), [...pointToWinners.get(playerToPoints.get(player)), player]);
        }

        let winners = [], points = 0;
        const winnerRecord = [...pointToWinners].sort((a, b) => (a[0] > b[0] && -1) || (a[0] === b[0] ? 0 : 1)).shift();
        if (!!winnerRecord) {
          points = winnerRecord[0];
          winners = winnerRecord[1];
          winners.sort();
        }
        res.send({
          lastWinner: {
            label: 'Letzte/r Gewinner/in',
            value: !!docs[docs.length - 1] ? docs[docs.length - 1].winner.name : undefined,
          },
          lastPlayTime: {
            label: 'Letzte Spielzeit',
            value: !!docs[docs.length - 1] ? docs[docs.length - 1].playTime : undefined,
          },
          playedGamesAmount: { label: 'Spiele insgesamt', value: docs.length },
          winnersAmount: { label: 'Gewinner insgesamt', value: playerToPoints.size },
          totalWinner: {
            label: 'Gewinner/in',
            value: !!winnerRecord ? `${winners.join(", ")} (${points})` : '',
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

router.route('/games-history').get((req, res, next) => {
  db.find({})
    .sort({ 'winner-name': 1, playTime: 1 })
    .exec(function (error: any, docs: any[]) {
      res.send(
        docs.reduce((prev: { name: string; data: number[][] }[], curr) => {
          const entryIndex = prev.findIndex((value) => value.name === curr.winner.name);
          if (entryIndex === -1) {
            return [...prev, { name: curr.winner.name, data: [[curr.playTime, 1]] }];
          }
          prev[entryIndex].data.push([curr.playTime, prev[entryIndex].data[prev[entryIndex].data.length - 1][1] + 1]);
          return prev;
        }, []),
      );
    });
});

export default router;
