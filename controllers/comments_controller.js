const Comment = require('../models/comment');

const Post = require('../models/post');


module.exports.create = async function(req,res){

    try{

        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
             post.save();//save after updating 

            req.flash('success', 'Comment Added');
            res.redirect('/');
        }

    }catch(err){
        // console.log('Error', err);
        req.flash('error', err);
        return res.redirect('back');
    }


}

module.exports.destroy = async function(req,res){

    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user==req.user.id){

            let postId = comment.post;
            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            req.flash('success', 'Comment Deleted')
            return res.redirect('back');
        }else{
            req.flash('success', 'You are not allowed to delete this comment');
            return res.redirect('back');
        }

    }catch(err){
        // console.log('Error', err);
        // return; 
        req.flash('error', err);
        return res.redirect('back');
    }

}