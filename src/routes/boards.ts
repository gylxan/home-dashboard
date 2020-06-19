import {Router} from 'express';
const router = Router();

const INDICATOR = 'boards';
// Root without parameter
router.route('/')
  .get((req, res) => {
    res.send([{
      "name" : "skipbo",
      "label" : "Skip Bo"
    }]);
  })


// Root with name identifier
// router.route('/:name')
//     // Get one by name
//     .get((req, res, next) => {
//         if (orderExists(req, res, next)) {
//             res.send(db.get(INDICATOR).find({ name: req.params.name }).value());
//         }
//     })
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
