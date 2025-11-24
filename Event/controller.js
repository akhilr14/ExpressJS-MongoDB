const eventService = require('./service');

async function createEvent(req) {
    return await eventService.createEvent(req);
}

async function getActiveEvent() {
    return await eventService.getActiveEvent();
}

async function getEventDetailById(id) {
    return await eventService.getEventDetailById(id);
}

async function getEventDetialWindow(first, last) {
    return await eventService.getEventDetialWindow(first, last);
}

async function updateEventById(id, dataUpdate) {
    return await eventService.updateEventById(id, dataUpdate);
}

async function deleteEventById(id) {
    return await eventService.deleteEventById(id);
}

module.exports = { createEvent, getActiveEvent, getEventDetailById, getEventDetialWindow, updateEventById, deleteEventById }