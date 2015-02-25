var bodyParser = require('body-parser');
var User = require('../models/user');

module.exports = function (app, express) {
    var userRouter = express.Router();

    userRouter.get('/', function (req, res) {
        res.json({message: 'api is loaded'});
    });

    userRouter.route('/users')
        .post(function (req, res) {
            var user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.permissions = req.query.permissions || [];

            user.save(function (err) {
                if (err) {
                    if (err.code === 11000) {
                        return res.json({success: false, message: 'Duplicate username.'});
                    } else {
                        return res.send(err);
                    }
                } else {
                    res.json(user);
                }

            });
        })
        .get(function (req, res) {
            User.find(function (err, users) {
                if (err) {
                    res.send(err);
                }
                res.json(users);
            })
        });

    userRouter.route('/users/:user_id')
        .get(function (req, res) {
            User.findById(req.params.user_id, function (err, user) {
                if (err) res.send(err);
                res.json(user);
            })
        })
        .put(function (req, res) {
            User.findById(req.params.user_id, function (err, user) {
                if (err) res.send(err);

                if (req.body.name) user.name = req.body.name;
                if (req.body.email) user.email = req.body.email;
                if (req.body.password) user.password = req.body.password;
                user.permissions = req.query.permissions || [];


                user.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(user);
                    }
                });
            });
        })
        .delete(function (req, res) {
            User.remove({_id: req.params.user_id}, function (err, user) {
                if (err) res.send(err);
                res.json({});
            })
        });

    return userRouter;
};