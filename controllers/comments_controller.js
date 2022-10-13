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

            if(req.xhr){

                comment = await Comment.findById(comment._id).populate('user');
                // Similar for comments to fetch the user's id!
                // comment = await comment.populate('user', 'name').execPopulate();
    

                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created"
                });
            }

            

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

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Comment Deleted')
            return res.redirect('back');
        }else{
            console.log('Error', err);
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