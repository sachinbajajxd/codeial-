const mongoose = require('mongoose');

const postSchema =new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

const Post = mongoose.Model('Post',postSchema);
module.exports=Post;

//mongoose.Schema.Types.ObjectId->refering to the unique objectid 
//ref->user.js