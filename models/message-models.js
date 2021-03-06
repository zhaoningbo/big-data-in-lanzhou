var mongoose=require('./db');

var messageSchema = new mongoose.Schema({
    name:String,
    content: String,
    createAt:{ type: Date, default: Date.now }
});

var MessageModel = mongoose.model('Message', messageSchema);

function Message(message){
    this.name=message.name;
    this.content=message.content;
    this.createAt=message.createAt;
}

module.exports =Message;

Message.prototype.save=function(callback){
    var message={
        name:this.name,
        content:this.content,
        createAt:this.createAt
    };

    var newMessage=new MessageModel(message);

    newMessage.save(function(err,message){
        if(err){
            return callback(err);
        }else{
            callback(null, message);
        }
    });
};

Message.getAll = function (skip,pageSize,callback) {
    MessageModel.find().exec(function(err,messages){
        if (err) {
            return callback(err);
        }
        callback(null,messages);
    });
};

Message.count = function(callback) {
    MessageModel.count().exec(function(err,total) {
        if(err) {
            return callback(err);
        }
        callback(null,total);
    });
};

Message.remove = function(id, callback) {
    MessageModel.where({_id:id}).findOneAndRemove().exec(function(err, messages) {
        if (err){
            return callback(err);
        }
        callback(null, messages);
    });
};





