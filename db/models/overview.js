const mongoose = require('mongoose');

const overviewSchema = new mongoose.Schema({
  acres: String,
  incidents: String,
  fatalities: String,
  structures: String,
  date: Date
});

overviewSchema.methods = {
  getAcres: function () {
    console.log(`acres: ` + this.acres);
  }
}

module.exports = mongoose.model('Overview', overviewSchema);