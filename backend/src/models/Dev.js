const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    user:{
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        //por id, qual usuarios deram likes
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        //por id, qual usuarios deram dislikes
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
},{
    timestamps: true, //createdAt, e updateAt (data e hora que foi cadastrado)
});

module.exports = model('Dev', DevSchema);