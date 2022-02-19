'use strict';
const AWS = require("aws-sdk");

AWS.config.update({region:'eu-west-1'})

const ses = new AWS.SES({apiVersion: '2010-12-01'});


module.exports.sendEmail = async friend => {
  if (friend) {
    const sendEmailConfig = {
      Source: process.env.VERIFIED_EMAIL || "user@example.com",
      Destination: {
        ToAddresses: [friend.contact],
      },
      Message: {
        Subject: {
          Data: "Happy Birthday!",
          Charset: "utf-8",
        },
        Body: {
          Html: {
            Data: `<h1>Happy birthday, dear ${friend.firstName}!</h1>`,
            Charset: "utf-8",
          },
        },
      },
    };
    
    const response = await ses.sendEmail(sendEmailConfig).promise();
    return response
  }
}