const express = require('express');

const router = express.Router();

const subscriptions = require('../models/subscriptions');
const subscriptionsController = require('../controllers/subscriptionsController');
const verifyJWT = require('../middleware/verifyJWT');

// //Post Method
// router.post('/postSub', async (req, res) => {
//     const data = new Model({
//         title: req.body.title,
//         status: req.body.status,
//         price: req.body.price,
//         articleCount: req.body.articleCount
//     })

//     try {
//         const dataToSave = await data.save();
//         res.status(200).json(dataToSave)
//     }
//     catch (error) {
//         res.status(400).json({message: error.message})
//     }
// })

// // GET Method
 router.get('/subs/all', async (req, res) => {
     try{
         const data = await subscriptions.find();
         res.json(data)
     }
     catch(error){
         res.status(500).json({message: error.message})
     }
 })

// //Delete by ID Method
// router.delete('/deleteSub/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const data = await Model.findByIdAndDelete(id)
//         res.send(`Subscription ${data.name} has been deleted..`)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

router.post('/subs', subscriptionsController.addSubscription);

router.put('/subs/:title', verifyJWT, subscriptionsController.updateSubscription);

router.delete('/subs/:title', verifyJWT, subscriptionsController.deleteSubscription);

router.get('/subs/all', verifyJWT, subscriptionsController.showSubscriptions);

router.get('/subs/:title', verifyJWT, subscriptionsController.showById);
// Give subscription to... (must be loggedin)
router.put('/subs/give/:title',verifyJWT, subscriptionsController.giveSubscription);

module.exports = router;