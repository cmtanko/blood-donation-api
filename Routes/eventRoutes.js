var express = require('express');

var routes = function (Event) {
    var eventRouter = express.Router();
    var eventController = require('../Controllers/eventController')(Event);
    //default users routes
    eventRouter.route('/')
        .post(eventController.post)
        .get(eventController.get);

    //CREATE CUSTOM MIDDLEWARE TO GET SINGLE USER DATA
    eventRouter.use('/:eventId', function (req, res, next) {
        Event.findById(req.params.eventId, function (err, event) {
            if (err) {
                res.status(500).send(err);
            } else if (event) {
                req.event = event;
                next();
            } else {
                res.status(404).send("no event found");
            }
        });
    });

    //individual user routes
    eventRouter.route('/:eventId')
        .get(eventController.getEventById)
        .put(eventController.putEvent)
        .patch(eventController.patchEvent)
        .delete(eventController.deleteEvent);
    return eventRouter;
}

module.exports = routes;



