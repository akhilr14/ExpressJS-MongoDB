var express = require('express');
var router = express.Router();
const EventModel = require('../models/Event-model');
const { validateEvent } =require('../validation/event-validation');
const { validationResult } = require('express-validator');

/* GET Event listing. */
router.get('/', function(req, res, next) {
  res.send('Event says Hi');
});

router.post('/create-event', validateEvent, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  try{
    const data = new EventModel(req.body);
    await data.save();
    console.log("Event added");
    res.status(201).json({msg: "Created"});
  }catch(error){
      res.status(400).json({ message: error.message });
  }
})

router.get('/event-active', async (req,res) => {
  const timestamp = new Date().toISOString();
  try{
    let data = await EventModel.find({on: {$gt: timestamp}});
    console.log("Fetched data");
    res.status(200).json({
      msg: "Fetched data",
      data: data
    });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/event-details/:id', async (req, res) => {
  try{
    let id = req.params.id;
    let data = await EventModel.findById(id);
    console.log("Fetched data");
    res.status(200).json({
      msg: "Fetched data",
      data: data
    });
  } catch(error){
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/event-window/:first/:last', async (req, res) => {
  try{
    let first = req.params.first;
    let last = req.params.last;
    let data = await EventModel.find({on: {$gte: first, $lte: last}});
    console.log("Fetched data");
    res.status(200).json({
      msg: "Fetched data",
      data: data
    });
  } catch(error){
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put('/event-update/:id', async (req, res) => {
  try{
    let id = req.params.id;
    let data = await EventModel.findByIdAndUpdate(id, req.body);
    console.log("Updated data");
    res.status(200).json({
      msg: "Updated data",
      data: data
    });
  } catch(error){
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete('/event-delete/:id', async (req, res) => {
  try{
    let id = req.params.id;
    let data = await EventModel.findByIdAndDelete(id);
    console.log("Deleted data");
    res.status(200).json({
      msg: "Deleted data",
      data: data
    });
  } catch(error){
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;