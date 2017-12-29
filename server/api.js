var db = require('./db.js');

var express = require('express');
var router = express.Router();


router.get('/task/create', function(req, res) {
    var createDate = new Date();
    var taskObj = req.query;
    taskObj.createDate = createDate;
    db.create(taskObj, function(err) {
        if (err) {
            return console.log(err);
        } else {
            var data = {
                success: true,
                msg: "任务创建成功～",
                data: {}
            }
            res.send(data);
        }
    })
})

router.get('/task/list', function(req, res) {
    db.find({}, function(err, tasks) {
        if (err) {
            return console.log(err);
        } else {
            var data = {
                success: true,
                data: tasks
            }
            res.send(data);
        }
    })
})

router.get('/task/delete', function(req, res) {
    var _id = req.query._id;
    var wherestr = {"_id": _id};
    db.remove(wherestr, function(err) {
        if (err) {
            return console.log(err);
        } else {
            var data = {
                success: true,
                msg: "删除成功～",
                data: {}
            }
            res.send(data);
        }
    })
})

router.get('/task/info', function(req, res) {
    var _id = req.query._id;
    var wherestr = {"_id": _id};
    db.find(wherestr, function(err, task) {
        if (err) {
            return console.log(err);
        } else {
            console.log(task)
            var data = {
                success: true,
                data: task
            }
            res.send(data);
        }
    })
})

router.get('/task/save', function(req, res) {
    var _id = req.query._id;
    var wherestr = {"_id": _id};
    var params = req.query;
    db.findOneAndUpdate(wherestr, params, function(err) {
        if (err) {
            return console.log(err);
        } else {
            var data = {
                success: true,
                msg: "保存成功～"
            };
            res.send(data);
        }
    })
})
    

module.exports = router;