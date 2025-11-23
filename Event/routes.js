var express = require('express');
var router = express.Router();

const EventContoller = require('./controller');
const { validateEvent } = require('./validation');

/* GET Event listing. */
router.get('/', function(req, res, next) {
  res.send('Event says Hi');
});

router.post('/create-event', validateEvent, async (req, res) => {
  try {
    let dbActionFeedback = await EventContoller.createEvent(req);
    if(dbActionFeedback.status) {
          res.status(200).json({status:true, count:dbActionFeedback.count, result:dbActionFeedback.result, error:null});
      } else {
          res.status(500).json({status:false, count:0, result:null, error:null});
      }
  } catch (error) {
      res.status(500).json({status:false, count:0, result:null, error:null});
  }
  res.end();
});

router.get('/event-active', async (req,res) => {
  try{
    let dbActionFeedback = await EventContoller.getActiveEvent();
    if(dbActionFeedback.status) {
          res.status(200).json({status:true, count:dbActionFeedback.count, result:dbActionFeedback.result, error:null});
      } else {
          res.status(500).json({status:false, count:0, result:null, error:null});
      }
  } catch (error) {
      res.status(500).json({status:false, count:0, result:null, error:null});
  }
  res.end();
});

router.get('/event-details/:id', async (req, res) => {
  try{
    let dbActionFeedback = await EventContoller.getEventDetialById(req.params.id);
    if(dbActionFeedback.status) {
          res.status(200).json({status:true, count:dbActionFeedback.count, result:dbActionFeedback.result, error:null});
      } else {
          res.status(500).json({status:false, count:0, result:null, error:null});
      }
  } catch (error) {
      res.status(500).json({status:false, count:0, result:null, error:null});
  }
  res.end();
});

router.get('/event-window/:first/:last', async (req, res) => {
  try{
    let dbActionFeedback = await EventContoller.getEventDetialWindow(req.params.first, req.params.last);
    if(dbActionFeedback.status) {
          res.status(200).json({status:true, count:dbActionFeedback.count, result:dbActionFeedback.result, error:null});
      } else {
          res.status(500).json({status:false, count:0, result:null, error:null});
      }
  } catch (error) {
      res.status(500).json({status:false, count:0, result:null, error:null});
  }
  res.end();
});

router.put('/event-update/:id', async (req, res) => {
  try{
    let dbActionFeedback = await EventContoller.updateEventById(req.params.id, req.body);
    if(dbActionFeedback.status) {
          res.status(200).json({status:true, count:dbActionFeedback.count, result:dbActionFeedback.result, error:null});
      } else {
          res.status(500).json({status:false, count:0, result:null, error:null});
      }
  } catch (error) {
      res.status(500).json({status:false, count:0, result:null, error:null});
  }
  res.end();
});

router.delete('/event-delete/:id', async (req, res) => {
  try{
    let dbActionFeedback = await EventContoller.deleteEventById(req.params.id);
    if(dbActionFeedback.status) {
          res.status(200).json({status:true, count:dbActionFeedback.count, result:dbActionFeedback.result, error:null});
      } else {
          res.status(500).json({status:false, count:0, result:null, error:null});
      }
  } catch (error) {
      res.status(500).json({status:false, count:0, result:null, error:null});
  }
  res.end();
});

module.exports = router;