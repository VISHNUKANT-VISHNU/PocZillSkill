'use strict'

const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'thebillbookindia@gmail.com',
    pass: "Billbook@123"
  },
  logger: true
})

exports.transporter = transporter
