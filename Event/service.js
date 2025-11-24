const EventModel = require('./model');
const { validationResult } = require('express-validator');
const { customLogger } = require('../middleware/logger');

//#region - createEvent(req)
async function createEvent(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        customLogger.error('error validating event data', errors);
        return {status:false, count:null, result:null, error: errors}; 
    }
    try{
        const data = new EventModel(req.body);
        await data.save()
        return {status:true, count: 1, result: data, error:null};
    } catch(err) {
        return {status:false, count: 0, result:null, error: err};
    }
}
//#endregion

//#region - getActiveEvent()
async function getActiveEvent() {
    const timestamp = new Date().toISOString();
    try{
        let data = await EventModel.find({on: {$gt: timestamp}});
        //console.log("Fetched data");
        return {status:true, count: data.length, result: data, error:null};
    } catch(err) {
        return {status:false, count:null, result:null, error:err};
    }
}
//#endregion

//#region - getEventDetialById(id)
async function getEventDetailById(id) {
    try{
        let data = await EventModel.findById(id);
        //console.log("Fetched data");
        return {status:true, count: 1, result: data, error:null};
    } catch(err) {
        return {status: false, count: 0, result: null, error: err};
    }
}
//#endregion

//#region - getEventDetialWindow(first, last)
async function getEventDetialWindow(first, last) {
    try{
        let data = await EventModel.find({on: {$gte: first, $lte: last}});
        //console.log("Fetched data");
        return {status:true, count: data.length, result: data, error:null};
    } catch(err) {
        return {status: false, count: 0, result: null, error: err};
    }
}
//#endregion

//#region - updateEventById(id, dataUpdate)
async function updateEventById(id, dataUpdate) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        customLogger.error('error validating event data', errors);
        return {status:false, count:null, result:null, error:errors}; 
    }
    try{
        let data = await EventModel.findByIdAndUpdate(id, dataUpdate);
        //console.log("Updated data");
        return {status:true, count: 1, result: data, error:null};
    } catch(err) {
        return {status: false, count: 0, result: null, error: err};
    }
}
//#endregion

//#region - deleteEventById(id)
async function deleteEventById(id) {
    try{
        let data = await EventModel.findByIdAndDelete(id);
        //console.log("Delete data");
        return {status:true, count:1, result: data, error:null};
    } catch(err) {
        return {status: false, count: 0, result: null, error: err};
    }
}
//#endregion

module.exports = {createEvent, getActiveEvent, getEventDetailById, getEventDetialWindow, updateEventById, deleteEventById};