import { Router } from 'express';
const router = Router();

export const ROUTE = '/skipbo';

const GAMES = [
  {
    playTime: 1592651904322,
    points: [
      {
        player: 'Guido',
        place: 1,
      },
      {
        player: 'Kristina',
        place: 2,
      },
      {
        player: 'Sven',
        place: 3,
      },
      {
        player: 'Anne',
        place: 4,
      },
    ],
  },
];
// Root without parameter
router.route('/').get((req, res) => {
  res.send(GAMES);
});

// Root with name identifier
router
  .route('/:timestamp')
  // Get one by name
  .get((req, res, next) => {
    res.send(GAMES.find((game) => `${game.playTime}` === req.params.timestamp));
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
