var express = require('express');

var routes = function (Event) {
    var eventRouter = express.Router();

    //default users routes
    eventRouter.route('/')
        .post(function (req, res) {
            var event = new Event(req.body);
            event.save();
            res.status(201).send(event);
        })
        .get(function (req, res) {
            query = req.query;
            Event.find(query, function (err, events) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(events);
                }
            });
        });

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
        .get(function (req, res) {
            res.json(req.event);
        })
        .put(function (req, res) {
            req.event.title = req.body.title;
            req.event.description = req.body.description;
            req.event.date = req.body.date;
            req.event.time = req.body.time;
            req.event.venue = req.body.venue;
            req.event.picture = req.body.picture;
            req.event.intersted = req.body.intersted;
            req.event.non_interested = req.body.non_interested;
            req.event.comment = req.body.comment;

            //SAVE NOW
            req.event.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.event);
                }
            });
        })
        .patch(function (req, res) {
            //DO NOT UPDATE ID
            if (req.body._id) {
                delete req.body._id;
            }
            //COPY WHATEVER IS UPDATED
            for (var p in req.body) {
                req.event[p] = req.body[p];
            }
            req.event.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.event);
                }
            });
        })
        .delete(function (req, res) {
            req.event.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            });
        });
    return eventRouter;
}

module.exports = routes;



