const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to:'samirkr2527@gmail.com',
    from:'samirkr2527@gmail.com',
    subject:'This is my first email creation.',
    text: 'I hope this one actually works!'
})