var eventController = function (Event) {

    var post = function (req, res) {
        var event = new Event(req.body);
        event.save();
        res.status(201).send(event);
    }

    var get = function (req, res) {
        query = req.query;
        Event.find(query, function (err, events) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(events);
            }
        });
    }

    var getEventById = function (req, res) {
        res.json(req.event);
    }

    var putEvent = function (req, res) {
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
    }

    var patchEvent = function (req, res) {
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
    }

    deleteEvent = function (req, res) {
        req.event.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Removed');
            }
        });
    }

    return {
        get: get,
        post: post,
        getEventById: getEventById,
        putEvent: putEvent,
        patchEvent: patchEvent,
        deleteEvent: deleteEvent
    }
}

module.exports = eventController;