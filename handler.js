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
  const email = process.env.EMAIL;

  console.log(`Parse URL '${url}' for Regex '${regex}'`);

  const checkResponseWithRegex = doRegex(regex);
  requestWebsite(url)
    .then(checkResponseWithRegex)
    .then(async (match) => {
      if (match) {
        console.log(`Found regex in URL. Send email to '${email}'`);
        // initiate sendgrid correctly with ApiKey
        sendgrid.setApiKey(sendgridApiKey);
        await sendgrid.send({
          to: email,
          from: email,
          subject: `Regex '${regex}' for url '${url}' matched`,
          text: `Regex '${regex}' for url '${url}' matched`
        });
      }
    });
};
