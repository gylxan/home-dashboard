import { Router } from 'express';
import { verifyIsCurrentUser, verifyToken } from '../middlewares/auth';
import { hashSync } from 'bcryptjs';
import { db } from './auth';

const router = Router();
export const ROUTE = '/users';
// Root without parameter
// router
//   .route('/')
//   .get((req, res) => {
//     db.find({})
//       .sort({ playTime: -1 })
//       .exec(function (err, docs) {
//         res.send(docs);
//       });
//   })
//   .post(verifyToken, (req, res) => {
//     db.insert({ playTime: req.body.playTime, winner: req.body.winner }, function (error: unknown, docs: SkipboGame) {
//       res.send(docs);
//     });
//   });

// Root with name identifier
router
  .route('/:id')
  // Edit one by id
  // TODO: Currently only the user itself can update his profile
  .put(verifyToken, verifyIsCurrentUser, (req, res) => {
    const { id, ...user } = req.body;

    let updatedUser = user;
    if (!!user.password) {
      const pwHash = hashSync(user.password, 8);
      updatedUser = { ...updatedUser, password: pwHash };
    }

    db.update({ _id: req.params.id }, { $set: updatedUser }, {}, () => {
      console.log(`Updated user ${id} with data: ${JSON.stringify(updatedUser)}`);
      res.send();
    });
  });
export default router;
