var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var superSecret = 'TheAmazingKreskin';

module.exports = function (app, express) {
    var userRouter = express.Router();

    userRouter.post('/authenticate', function (req, res) {
        User.findOne({
            username: req.body.username
        }).select('name username password').exec(function (err, user) {
            if (err) throw err;

            if (!user) {
                res.json({success: false, message: 'User not found'});
            } else {
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.json({success: false, message: 'Wrong password'});
                } else {
                    var token = jwt.sign({
                        name: user.name,
                        username: user.username,
                        _id: user._id
                    }, superSecret, {
                        expiresInMinutes: 1440
                    });

                    res.json({
                        success: true,
                        message: 'login ok',
                        token: token,
                        _id: user._id
                    });
                }
            }
        });
    });

    userRouter.get('/', function (req, res) {
        res.json({message: 'api is loaded'});
    });

    userRouter.use(function (req, res, next) {
        var token = req.body.token || req.params.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, superSecret, function (err, decoded) {
                if (err) {
                    return res.status(401).send({success: false, message: 'Failed to authenticate token'});
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            return res.status(401).send({success: false, message: 'No token provided'});
        }
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