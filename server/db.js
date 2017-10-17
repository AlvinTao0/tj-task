var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tj-task');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', function(callback) {
    console.log('yay!')
})

var Schema = mongoose.Schema;
var taskSchema = new Schema({
    title: String,
    createDate: Date,
    targetDate: Number,
    targetTime: Number,
    content: String,
    status: Number
})

var taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;