const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _alumni = require('./alumni');
const _teaching=require('./teaching');      
const GradeSchema = new Schema({
	Alumni: {
		type: Schema.Types.ObjectId, 
        ref: _alumni,
		required:true	
	},
    Teaching: {
		type: Schema.Types.ObjectId, 
        ref: _teaching,
		required:true
	},
    DC_grade: {
		type: Number,
        default:99.99,
	},
    DS_grade: {
		type: Number,
        default:99.99,
	},
    TP_grade: {
		type: Number,
        default:99.99,
	},
    DateModified: {
		type: String,
	},
    
});
GradeSchema.pre('save',async function (next){
	const date = new Date();
    this.DateModified = date.toLocaleString();
	next();
});


const Grade = mongoose.model("Grade", GradeSchema);

module.exports = Grade;