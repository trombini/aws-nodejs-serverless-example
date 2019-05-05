'use strict';

const axios = require('axios');
const sendgrid = require('@sendgrid/mail');

const doRegex = r => (data) => {
  const regularEx = new RegExp(r);
  const result = data.match(regularEx);
  return Promise.resolve(result);
};

const requestWebsite = (url) => {
  return axios({
    url,
    method: 'get'
  }).then(response => response.data);
};

module.exports.run = (event, context, callback) => {

  const url = process.env.URL;
  const regex = process.env.REGEX;
  const sendgridApiKey = process.env.SENDGRID;

  console.log(`Parse URL '${url}' for Regex '${regex}'`);

  const checkResponseWithRegex = doRegex(regex);
  requestWebsite(url)
    .then(checkResponseWithRegex)
    .then(async (match) => {
      if (!match) {
        console.log('Send email');
        // initiate sendgrid correctly with ApiKey
        sendgrid.setApiKey(sendgridApiKey);
        await sendgrid.send({
          to: 'riccardo@trombini.ch',
          from: 'riccardo@trombini.ch',
          subject: 'AWS LAMDA',
          text: `Regex for url '${url}' matched`
        });
      }
    });
};
