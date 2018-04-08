import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
const requestMod = require('request');
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../../config'
const phoneParser = require('phone-parser');
const path = require('path');
const Schema = mongoose.Schema;

var twilio = require('twilio');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;
var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_TOKEN;
var client = require('twilio')(accountSid, authToken);

// =================================================================
// MongoDB Schemas 
// =================================================================

const CallSchema = new Schema({
  primaryName: {
    type: String
  },
  primaryNumber: {
    type: String
  },
  patientName: {
    type: String
  },
  patientNumber: {
    type: String
  }
});

const ConfirmationSchema = new Schema({
  patientNumber: {
    type: String
  },
  status: {
    type: Boolean
  }
}, { timestamps: true });

const CallClass = mongoose.model('call', CallSchema);
const ConfirmationClass = mongoose.model('confirmation', ConfirmationSchema);

export default (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(express.static(path.join(__dirname + '/public')));
  let name = 'None';
  let count = 0;
  let primary = '';
  let patientNum = '';
  let patientName = '';

  function phoneParse(number) {
    return phoneParser(number, '+1xxxxxxxxxx');
  }

  app.post('/make-call', (req, res) => {
    console.log(req.body);
    primary = phoneParse(req.body.primaryNum);
    name = req.body.name;
    patientName = req.body.patientName;
    console.log(primary);
    patientNum = phoneParse(req.body.patientNum);
    setTimeout(() => {
      client.calls.create({
        url: 'http://81e93c47.ngrok.io/voice',
        to: patientNum,
        from: process.env.TWILIO_PHONE
      }, (err, call) => {
        if (err) {
          console.log(err);
        } else {
          console.log(call.pid);
        }
      });
    }, 0);
    res.status(200).json({ status: 'good', message: 'works' });
  });

  app.post('/:number/new-call', (request, response) => {
    const number = request.params.number;
    const status = request.body.status;
    console.log(request.body);
    ConfirmationClass.create({
      patientNumber: number,
      status: status
    }).then((conf) => {
      response.send(conf);
    })
      .catch((err) => {
        console.log(err);
      });
  });

  app.post('/voice', (request, response) => {

    const twiml = new VoiceResponse();

    const gather = twiml.gather({
      numDigits: 1,
      action: '/gather'
    });

    gather.say({ voice: 'man' }, `Pill Check from ${name}.  Greetings and Hello ${patientName}.  This is ${name} sending you a call on behalf of Pill Check to see if you have taken your pills today.  Press 1 if you have.`);
    // If user doesn't respond, repeat the menu
    //twiml.redirect('/voice');

    // Render the response as XML in reply to the webhook request
    response.type('text/xml');
    response.send(twiml.toString());
  });

  app.post('/gather', (request, response) => {
    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new VoiceResponse();

    function createConf(status) {
      const opts = {
        uri: `http://0.0.0.0:9000/${patientNum}/new-call`,
        body: JSON.stringify({ status: status }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      requestMod(opts, (err, res) => {
        console.log(res.body);
        return;
      });
    }

    if (request.body.Digits) {
      switch (request.body.Digits) {
        case '1':
          twiml.say('You have confirmed that you have taken your pills today.  Your primary caregiver will be notified!  Have a nice day!');
          createConf(true);
          client.messages.create({
            to: primary,
            from: process.env.TWILIO_PHONE,
            body: `Hey ${name}, this is a message to let you know that ${patientName} responded YES to taking their pills today!`
          })
          break;
        default:
          twiml.say('You did not confirm pill adherence today.  A follow up call will occur in 15 minutes.');
          createConf(false);
          client.messages.create({
            to: primary,
            from: process.env.TWILIO_PHONE,
            body: `Hey ${name}, this is a message to let you know that ${patientName} DID NOT confirm taking their pills today.`
          })
            .then((message) => console.log(message.sid))
          break;
      }
    } else {
      twiml.redirect('/voice');
    }

    // Render the response as XML in reply to the webhook request
    response.type('text/xml');
    response.send(twiml.toString());
  });

  app.post('/sounding', (req, res) => {
    res.type('text/xml');
    res.send('<?xml version="1.0" encoding="UTF-8"?><Response><Play>https://demo.twilio.com/docs/voice.xml</Play></Response>');
  });

  app.post('/:number/canceled', (req, res) => {
    const filterOpts = {
      status: 'canceled',
      to: phoneParse(req.params.number)
    }
    client.calls.each(filterOpts, call => console.log(call.startTime));
    res.send('Done');
  });

  app.post('/:number/success', (req, res) => {
    let calls = [];
    const filterOpts = {
      status: 'completed',
      to: phoneParse(req.params.number)
    }
    setTimeout(() => {
      res.send(calls);
    }, 8000)
    client.calls.each(filterOpts, call => {
      calls.push(call);
    });
  });

  app.get('/:number/call-statuses', (req, res) => {
    const num = phoneParse(req.params.number);

    ConfirmationClass.find({ patientNumber: num }).then((calls) => {
      res.json(calls);
    });
  });

  app.get('/all-statuses', (req, res) => {
    ConfirmationClass.find().then((calls) => {
      res.json(calls);
    });
  });

  app.use(apiRoot, routes)

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  return app
}
