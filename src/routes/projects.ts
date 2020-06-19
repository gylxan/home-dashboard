import {Router} from 'express';
const router = Router();

const INDICATOR = 'projects';
// Root without parameter
router.route('/')
    .get((req, res) => {
        res.send([{
            "name" : "Test"
        }]);
    })
    // .post((req, res, next) => {
    //     if (!req.body.name || req.body.name.trim() === '') {
    //         next('Name ist leer');
    //     }
    //     // Check a order with this name doesn't exists
    //     if (db.get(INDICATOR)
    //         .find({ name: req.body.name }).size().value() !== 0) {
    //         next('Bestellung mit Name "%1" existiert bereits'.replace('%1', req.body.name));
    //         return;
    //     }
    //     let order = req.body;
    //     // Add created timestamp to order
    //     order.createdAt = Date.now();
    //     res.send(db.get(INDICATOR).push(order).write());
    // });


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
