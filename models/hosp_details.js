const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const hospSchema = new Schema({
id : {
    type : Number,
    required: true
},
name : {
    type : String,
    required: true
},
recovered : {
    type : Number,
    required: true
},
present : {
    type : Number,
    required: true
},
beds_vacant : {
    type : Number,
    required: true
},
beds_present : {
    type : Number,
    required: true
},
em_beds_vacant : {
    type : Number,
    required: true
},
em_beds_present : {
    type : Number,
    required: true
},
covid_test : {
    type : Boolean,
    required: true
},
vaccination : {
    type : Boolean,
    required: true
},
oxygen_req : {
    type : Number,
    required: true
},
oxygen_av : {
    type : Number,
    required: true
},
address : {
    type : String,
    required: true
}
});

const hosp_detail = mongoose.model('hosp_detail',hospSchema);
module.exports = hosp_detail;