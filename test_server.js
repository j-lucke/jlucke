const express = require('express')
const app = express()

const path = require('path')
const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const config = require('./config.js')
const OAuth2 = google.auth.OAuth2
const OAuth2_client = new OAuth2(config.clientId, config.clientSecret)
OAuth2_client.setCredentials({refresh_token: config.refreshToken})

function send_mail(words, recipient) {
    const accessToken = OAuth2_client.getAccessToken()
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: config.user,
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            refreshToken: config.refreshToken,
            accessToken: accessToken
        }
    })

    const mail_options = {
        from: `ME <${config.user}>`,
        to: recipient,
        subject: 'BOP! got em',
        text: words
    }

    transport.sendMail(mail_options, function(error, result) {
        if (error) {
            console.log('error: ', error)
        } else {
            console.log('success: ', result)
        }
        transport.close()
    })
}



app.use( (req, res, next) => {
    console.log(req.url)
    next()
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))


app.post('/contact', (req, res) => {
    res.sendStatus(200)
    send_mail(req.body.message, 'luckejonathan2@gmail.com')
    console.log(req.body)
})

app.listen(3000, () => {
    console.log('listening on 3000...')
})
