var express = require('express');
var router = express.Router();

const EventContoller = require('./controller');
const { validateEvent } = require('./validation');
const { customLogger } = require('../middleware/logger');

/* GET Event listing. */
router.get('/', function(req, res, next) {
    res.send('Event says Hi');
});

//#region - Create event API
router.post('/create-event', validateEvent, async (req, res) => {
    try {
      let dbActionFeedback = await EventContoller.createEvent(req);
      if(dbActionFeedback.status) {
          customLogger.info(`created an event | ${req.method} ${req.originalUrl} - ${res.statusCode}`);
                  // | ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms
            res.status(200).json({status:true, count:dbActionFeedback.count, result:dbActionFeedback.result, error:null});
        } else {
          customLogger.error(`Database error | ${error} - ${req.method} ${req.originalUrl} - ${res.statusCode}`);
            res.status(500).json({status:false, count:0, result:null, error:null});
        }
    } catch (error) {
        customLogger.error(`Validation error | ${error} - ${req.method} ${req.originalUrl} - ${res.statusCode}`);
        res.status(500).json({status:false, count:0, result:null, error:null});
    }
});
//#endregion

//#region - Active event list API
router.get('/event-active', async (req,res) => {
  try{
    let dbActionFeedback = await EventContoller.getActiveEvent();
    if(dbActionFeedback.status) {
      customLogger.info(`fetched all active event data | ${req.method} ${req.originalUrl} - ${res.statusCode}`);
          res.status(200).json({status:true, count:dbActionFeedback.count, result:dbActionFeedback.result, error:null});
      } else {
        customLogger.error(`error getting data | ${dbActionFeedback.error} - ${req.method} ${req.originalUrl} - ${res.statusCode}`);
          res.status(500).json({status:false, count:0, result:null, error:null});
      }
  } catch (error) {
    customLogger.error(`error getting data | ${error} - ${req.method} ${req.originalUrl} - ${res.statusCode}`);
      res.status(500).json({status:false, count:0, result:null, error:null});
  }
});
//#endregion

//#region - Event Details by Id API
router.get('/event-details/:id', async (req, res) => {
  try{
    let dbActionFeedback = await EventContoller.getEventDetailById(req.params.id);
    if(dbActionFeedback.status) {
      customLogger.info(`fetched event details by id | ${req.method} ${req.originalUrl} - ${res.statusCode}`);
      res.status(200).json({status:true, count:dbActionFeedback.count, result:dbActionFeedback.result, error:null});
    } else {
      customLogger.error(`error getting event details by id | ${dbActionFeedback.error} - ${req.method} ${req.originalUrl} - ${res.statusCode}`);
      res.status(500).json({status:false, count:0, result:null, error:null});
    }
  } catch (error) {
    customLogger.error(`error getting event details by id | ${error} - ${req.method} ${req.originalUrl} - ${res.statusCode}`);
      res.status(500).json({status:false, count:0, result:null, error:null});
  }
  res.end();
});
//#endregion

//#region - Event in a specified date frame API
router.get('/event-window/:first/:last', async (req, res) => {
  try{
    let dbActionFeedback = await EventContoller.getEventDetialWindow(req.params.first, req.params.last);
    if(dbActionFeedback.status) {
      customLogger.info(`fetched event details by a specified time frame | ${req.method} ${req.originalUrl} - ${res.statusCode}`);
          res.status(200).json({status:true, count:dbActionFeedback.count, result:dbActionFeedback.result, error:null});
      } else {
        customLogger.error(`error getting event details by a specified time frame | ${dbActionFeedback.error} - ${req.method} ${req.originalUrl} - ${res.statusCode}`);
          res.status(500).json({status:false, count:0, result:null, error:null});
      }
  } catch (error) {
    customLogger.error(`error getting event details by a specified time frame | ${error} - ${req.method} ${req.originalUrl} - ${res.statusCode}`);
      res.status(500).json({status:false, count:0, result:null, error:null});
  }
  res.end();
});
//#endregion

//#region - Update Event by Id API
router.put('/event-update/:id', validateEvent, async (req, res) => {
  try{
    let dbActionFeedback = await EventContoller.updateEventById(req.params.id, req.body);
    if(dbActionFeedback.status) {
      customLogger.info(`updated event details by id | ${req.method} ${req.originalUrl} - ${res.statusCode}`);
          res.status(200).json({status:true, count:dbActionFeedback.count, result:dbActionFeedback.result, error:null});
      } else {
        customLogger.error(`error updating event details by id | ${dbActionFeedback.error} - ${req.method} ${req.originalUrl} - ${res.statusCode}`);
          res.status(500).json({status:false, count:0, result:null, error:null});
      }
  } catch (error) {
    customLogger.error(`error validating event details by id | ${error} - ${req.method} ${req.originalUrl} - ${res.statusCode}`);
      res.status(500).json({status:false, count:0, result:null, error:null});
  }
});
//#endregion

//#region - Delete Event by Id API
router.delete('/event-delete/:id', async (req, res) => {
  try{
    let dbActionFeedback = await EventContoller.deleteEventById(req.params.id);
    if(dbActionFeedback.status) {
      customLogger.info(`deleted event details by id | ${req.method} ${req.originalUrl} - ${res.statusCode}`);
          res.status(200).json({status:true, count:dbActionFeedback.count, result:dbActionFeedback.result, error:null});
      } else {
        customLogger.error(`error deleting event details by id | ${dbActionFeedback.error} - ${req.method} ${req.originalUrl} - ${res.statusCode}`);
          res.status(500).json({status:false, count:0, result:null, error:null});
      }
  } catch (error) {
    customLogger.error(`error deleting event details by id | ${error} - ${req.method} ${req.originalUrl} - ${res.statusCode}`);
      res.status(500).json({status:false, count:0, result:null, error:null});
  }
  res.end();
});
//#endregion

module.exports = router;