const EventModel = require('./model');
// const { validateEvent } = require('./validation');
const { validationResult } = require('express-validator');

const logger = require('../middleware/logger')

async function createEvent(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.customLogger.error('error validating data');
        return {status:false, count:null, result:null, error:errorMsg}; 
    }
    const data = new EventModel(req.body);
    let isInserted = false;
    let errorMsg = "";
    await data.save().then(() => {
        isInserted = true;
    }).catch((err) => {
        isInserted = false;
        errorMsg = err;
    });
    if(isInserted){
        console.log("Event added");
        logger.customLogger.info('success');
        return {status:true, count:null, result: data, error:null};
    } else {
        logger.customLogger.error('error creating data');
        return {status:false, count:null, result:null, error:errorMsg};
    }
}

// router.post('/create-event', validateEvent, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     logger.customLogger.error('error creating data');
//     return res.status(400).json({ errors: errors.array() }); 
//   }
//   try{
//     const data = new EventModel(req.body);
//     await data.save();
//     console.log("Event added");
//     logger.customLogger.info('success');
//     res.status(201).json({msg: "Created"});
    
//   }catch(error){
//       logger.customLogger.error('error creating data');
//       res.status(400).json({ message: error.message });
      
//   }
// })

async function getActiveEvent() {
    const timestamp = new Date().toISOString();
    try{
        let data = await EventModel.find({on: {$gt: timestamp}});
        console.log("Fetched data");
        logger.customLogger.info('success');
        return {status:true, count:null, result: data, error:null};
    } catch(err) {
        logger.customLogger.error('error getting data');
        return {status:false, count:null, result:null, error:errorMsg};
    }
}

// router.get('/event-active', async (req,res) => {
//   const timestamp = new Date().toISOString();
//   try{
//     let data = await EventModel.find({on: {$gt: timestamp}});
//     console.log("Fetched data");
//     res.status(200).json({
//       msg: "Fetched data",
//       data: data
//     });
//   }catch(error){
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

async function getEventDetialById(id) {
    try{
        let data = await EventModel.findById(id);
        console.log("Fetched data");
        logger.customLogger.info('success');
        return {status:true, count:null, result: data, error:null};
    } catch(err) {
        logger.customLogger.error('error getting data');
        return {status: false, count: null, result: null, error: err};
    }
}

// router.get('/event-details/:id', async (req, res) => {
//   try{
//     let id = req.params.id;
//     let data = await EventModel.findById(id);
//     console.log("Fetched data");
//     res.status(200).json({
//       msg: "Fetched data",
//       data: data
//     });
//   } catch(error){
//     console.log(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

async function getEventDetialWindow(first, last) {
    try{
        let data = await EventModel.find({on: {$gte: first, $lte: last}});
        console.log("Fetched data");
        logger.customLogger.info('success');
        return {status:true, count:null, result: data, error:null};
    } catch(err) {
        logger.customLogger.error('error getting data');
        return {status: false, count: null, result: null, error: err};
    }
}

// router.get('/event-window/:first/:last', async (req, res) => {
//   try{
//     let first = req.params.first;
//     let last = req.params.last;
//     let data = await EventModel.find({on: {$gte: first, $lte: last}});
//     console.log("Fetched data");
//     res.status(200).json({
//       msg: "Fetched data",
//       data: data
//     });
//   } catch(error){
//     console.log(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

async function updateEventById(id, dataUpdate) {
    try{
        let data = await EventModel.findByIdAndUpdate(id, dataUpdate);
        console.log("Updated data");
        logger.customLogger.info('success');
        return {status:true, count:null, result: data, error:null};
    } catch(err) {
        logger.customLogger.error('error updating data');
        return {status: false, count: null, result: null, error: err};
    }
}

// router.put('/event-update/:id', async (req, res) => {
//   try{
//     let id = req.params.id;
//     let data = await EventModel.findByIdAndUpdate(id, req.body);
//     console.log("Updated data");
//     res.status(200).json({
//       msg: "Updated data",
//       data: data
//     });
//   } catch(error){
//     console.log(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

async function deleteEventById(id) {
    try{
        let data = await EventModel.findByIdAndDelete(id);
        console.log("Delete data");
        logger.customLogger.info('success');
        return {status:true, count:null, result: data, error:null};
    } catch(err) {
        logger.customLogger.error('error deleting data');
        return {status: false, count: null, result: null, error: err};
    }
}

// router.delete('/event-delete/:id', async (req, res) => {
//   try{
//     let id = req.params.id;
//     let data = await EventModel.findByIdAndDelete(id);
//     console.log("Deleted data");
//     res.status(200).json({
//       msg: "Deleted data",
//       data: data
//     });
//   } catch(error){
//     console.log(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

module.exports = {createEvent, getActiveEvent, getEventDetialById, getEventDetialWindow, updateEventById, deleteEventById};