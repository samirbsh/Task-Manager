const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) =>{
    // console.log(email)
    sgMail.send({
        to:email,
        from:'samirkr2527@gmail.com',
        subject:'Thanks for Joining in',
        text:`Welcome to the app, ${name}. Let me know how do you get along with the app.`
    }).then(()=>{
        console.log('Sent Successfuly!')
    }).catch((error)=>{
        console.log(error)
    })
}

const sendCancelationEmail = (email, name) =>{
    // console.log(email)
    sgMail.send({
        to:email,
        from:'samirkr2527@gmail.com',
        subject:'Sorry to see you go!',
        text:`Goodbye, ${name}. I hope tosee you back soon.`
    }).then(()=>{
        console.log('Sent Successfuly!')
    }).catch((error)=>{
        console.log(error)
    })
}
module.exports={
    sendWelcomeEmail,
    sendCancelationEmail
}