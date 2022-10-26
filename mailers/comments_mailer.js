const nodeMailer=require('../config/nodemailer');

//module.exports=newComment

//This is another way of exporting
exports.newComment = (comment) =>{

    console.log('Inside new Comment mailer', comment);
    console.log(comment.user.email);

    nodeMailer.transporter.sendMail({

        from: 'sachinBajajCodeial@gmail.com', // sender address
        to: comment.user.email, // list of receivers
        subject: 'New Comment Published', // Subject line
        html: "<b>Yup, your comment is published!</b>", // html body

    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message Sent', info);
        return;
    });

}
//comment.post.user.email ->in case of post