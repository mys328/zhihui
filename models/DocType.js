var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;

var DocTypeSchema = new Schema({
  htmlId: { type: String},
  typeName: { type: String}
});

DocTypeSchema.plugin(BaseModel);
DocTypeSchema.index({htmlId: 1}, {unique: true});
DocTypeSchema.index({typeName: 1});

mongoose.model('DocType', DocTypeSchema);
