
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ca-fire-tracker-dev_3051:HrRaQDrw2FkTn8g9@cluster0.q74v1.mongodb.net/ca_fire_tracker?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

module.exports = db;
