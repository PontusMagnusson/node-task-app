const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'pontus.magnusson@task-app-sendgrid.com',
        subject: 'Thank you for registering',
        text: `Welcome to the app, ${name}.`
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'pontus.magnusson@task-app-sendgrid.com',
        subject: 'Sad to see you go',
        text: `Goodbye, ${name}. :( Was there anything we could have done to keep you as a customer?`
    })
}


module.exports = { 
    sendWelcomeEmail,
    sendGoodbyeEmail
}